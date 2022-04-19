using System;
using System.Collections.Generic;
using System.Text;
using System.Net;
using System.Net.Sockets;
using System.Threading;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using 云打印;
using CloudPrint.Entity;
using CloudPrint.utils;
using CloudPrint.entity;
using CloudPrint.Api;

namespace CloudPrint
{
   public class TcpClient
    {
        static Socket clientSocket;
        static String outBufferStr;
        static Byte[] outBuffer = new Byte[1024*1024];
        static Byte[] inBuffer = new Byte[1024*1024];

        private bool isRunning = false;
        private int lostConneTime = 0;

        private Thread WorkThread = null;
        private Thread heartThread = null;
        public TcpClient()
        {
            BuildConnection();
            WorkThread = new Thread(WorkFunc);//工作（接收数据）线程
            WorkThread.IsBackground = true;
            WorkThread.Start();
           
        }

        public void BuildConnection()
        {
            //将网络端点表示为IP地址和端口 用于socket侦听时绑定  
            IPEndPoint ipep = new IPEndPoint(IPAddress.Parse("59.111.148.52"), 5301); 
            clientSocket = new Socket(ipep.AddressFamily, SocketType.Stream, ProtocolType.Tcp);
            try
            {
                clientSocket.Connect(ipep);
                isRunning = true;
            }
            catch
            {
                Console.WriteLine("服务器未开启！");
                
            }
        }

        public void Send(string content)
        {
            try
            {
                //发送消息
                outBuffer = Encoding.UTF8.GetBytes(content);
                clientSocket.Send(outBuffer, outBuffer.Length, SocketFlags.None);
            }
            catch
            
            {
                this.lostConneTime += 1;
                Console.WriteLine("丢失python连接{0:N0}", this.lostConneTime);
            }
            if (this.lostConneTime == 10)
            {
                BuildConnection();
                this.lostConneTime = 0;
            }
        }

        private void WorkFunc()
        {
            while (isRunning)
            {
                if (clientSocket != null)
                {
                    try
                    {
                        Console.WriteLine("正在监听...");
                        int recvCount = clientSocket.Receive(inBuffer, 1024*1024, SocketFlags.None);
                        if (recvCount > 0)
                        {
                            string recvMsg = Encoding.UTF8.GetString(inBuffer, 0, recvCount);
                            AnalysisReceivedMsg(recvMsg);
                        }
                    }
                    catch (Exception ex)
                    {
                        Console.WriteLine(ex);
                        Thread.Sleep(3000);
                        this.BuildConnection();
                    }
                }
            }

        }

        [Obsolete]
        private void AnalysisReceivedMsg(string content)
        {
            JObject jsonData = (JObject)JsonConvert.DeserializeObject(content);
            Instruct instruct_data = new Instruct();
            instruct_data.instruct_dict = new Dictionary<string, object>();
            instruct_data.instruct_id = (int)jsonData["instruct_id"];
            if (instruct_data.instruct_id == 1001)//1001代表检查是否保持连接状态
            {
                //SendAliveHeart();
            }

            if (instruct_data.instruct_id == 1002)//2代表打印命令
            {
                instruct_data.instruct_id = 2002;
                GlobalData.printer_name = jsonData["instruct_dict"]["printer_name"].ToString();
                String OrderId = jsonData["instruct_dict"]["order_id"].ToString();
                int FileCount = (int)jsonData["instruct_dict"]["file_count"];
                List<TempFile> file_list = JsonConvert.DeserializeObject<List<TempFile>>(jsonData["instruct_dict"]["tempFile_list"].ToString());

                Order order = new Order();
                order.OrderId = OrderId;
                order.FileCount = FileCount;

                foreach (TempFile file in file_list)
                {

                    //file.OrderId = OrderId;
                    //file.FileCount = FileCount;
                    //file.Duplex = file.PrintInfo["Duplex"]=="2";
                    //file.PrintColor = file.PrintInfo["PrintColor"]=="2";
                    //file.PrintFromRange = (short)Convert.ToDouble(file.PrintInfo["PrintFromPage"]);
                    //file.PrintToRange = (short)Convert.ToDouble(file.PrintInfo["PrintToPage"]);
                    //file.PrintPageNum = (short)Convert.ToDouble(file.PrintInfo["PrintPageNum"]);
                    //file.PrintCount = (short)Convert.ToDouble(file.PrintInfo["PrintCount"]);
                    
                    //file.FileNewName = file.FileId + "." + file.FileType;
                    //file.FileNewNamePdf = file.FileNewName + ".pdf";
               
                    PrintJob printJob = new PrintJob();
                    Thread printThread = new Thread(() => printJob.StartPrintWork(file));
                    printThread.IsBackground = true;
                    printThread.Start();
                }
                PrinterApi.FeedBackPrintState(1, "打印成功", OrderId);

            }
            if (instruct_data.instruct_id == 1003)//3代表获取店铺打印机信息
            {
                instruct_data.instruct_content = "获取打印机列表成功";
                string instruct_data_str = JsonConvert.SerializeObject(instruct_data);//对象转字符串
                Send(instruct_data_str);
            }
           
        }

        public void SendAliveHeart()
        {
            Instruct instruct_data = new Instruct();
            instruct_data.instruct_dict = new Dictionary<string, object>();
            instruct_data.instruct_id = 2004;
            instruct_data.instruct_content = "Heart_"+ GlobalData.store_id;
            instruct_data.instruct_dict.Add("store_id", GlobalData.store_id);
            string instruct_data_str = JsonConvert.SerializeObject(instruct_data);//对象转字符串

            while (true)
            {
                Console.WriteLine("心跳" + instruct_data_str);
                Thread.Sleep(60000);

                try {
                
                    Send(instruct_data_str);
                    Console.WriteLine("发送成功");
                }
                catch
                {
                    Console.WriteLine("发送失败");
                }
            }
            
            
        }

        public static object Add(object obj, string key, object value)
        {
            JObject jObj = JObject.Parse(JsonConvert.SerializeObject(obj));
            jObj.Add(new JProperty(key, value));
            return JsonConvert.DeserializeObject(jObj.ToString());
        }
    }
}
