"use client"
import React ,{useState,useEffect}from 'react'

import dynamic from "next/dynamic";
const SideBare = dynamic(() => import("../AdminSidebar/page"));
import CardStats from "../AdminCard/page";
import { MdVerticalAlignTop } from "react-icons/md";
import Chart from 'chart.js/auto';
import axios from 'axios'
import { useRouter } from 'next/navigation';
// import '../AdminHome/AdminDes.css'


interface clientProps{
    name: string,
email :string, 
lastName :string,
image :string,
telNumb : number,
cinNum: number ,
longitude :string,
lattitude :string,
adress : string,
}
interface sellerProps{
    name: string,
    email :string, 
    lastName :string,
    image :string,
    telNumb : number,
    cinNum: number ,
    longitude :string,
    lattitude :string,
    adress : string,
}
interface MemberPr{
    type :string,
price:number
}
// interface biditem{
//     images:string
//     name : string 
//     price :number 
//     timeStart :TimeRanges 
//     timeEnd :TimeRanges 
//     reviews:number
//     views :number 
//     watching :number
//     description: string 
//     longitude :string
//     lattitude: string
//     sold :number 
//     sellers_id: number
// }
const HomePage = () => {
    const [Data, setData] = useState<clientProps[]>([]);
    const [Data1, setData1] = useState<sellerProps[]>([]);
    const [data2,setData2]= useState <MemberPr[]>([])
    const [data3,setData3] =useState <[]>([])
    const [total ,setTotal]=useState<number>(0)
    const [total1,setTotal1] =useState <number>(0)
   const [cordoner , setCordoner]=useState<[]> ([])
   const [graph , setGraph]=useState([])
   const [graph2,setGraph2]=useState ([])
   const [reclamtion,setReclamation]= useState <[]>([])


    useEffect(() => {
        axios
          .get('http://127.0.0.1:5000/dash/het')
          .then((res) => {
            const Data: clientProps[] = res.data;
            setData(Data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
      useEffect(() => {
        axios
          .get('http://127.0.0.1:5000/dash/SelItem')
          .then((res) => {
            const Data:[] = res.data;
            console.log(Data);
            setCordoner(Data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
      useEffect(() => {
        axios
          .get('http://127.0.0.1:5000/dash/getsel')
          .then((res) => {
            const Data: sellerProps[] = res.data;
            setData1(Data);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
      useEffect(() => {
        axios
          .get('http://127.0.0.1:5000/dash/getMember')
          .then((res) => {
            const fetchedData: MemberPr[] = res.data;
            setData2(fetchedData);
    
            
            const totalPrice = fetchedData.reduce((acc, item) => acc + item.price, 0);
            setTotal((prevTotal) => prevTotal + totalPrice);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
      
      useEffect(() => {
        axios
          .get('http://127.0.0.1:5000/dash/getPro')
          .then((res) => {
            const fetchedData: [] = res.data; 
            setData3(fetchedData);
            
            const totalSold = fetchedData.reduce((acc, item) => acc + item , 0);
            
            setTotal1((prevTotal) => prevTotal + totalSold);
          })
          .catch((err) => {
            console.log(err);
          });
      }, []);
   

 
    // const router=useRouter()
    // useEffect(()=>{
    //     const role=localStorage.getItem('role')
    //     const token=localStorage.getItem('user')
    //     if(role==='admin'){
    //         axios.get(`http://localhost:5000/admin/home`,{headers:{Authorization:`Bearer ${token}`}})
    //         .then(r=>console.log("r")).catch(err=>router.push('/register/seller'))
    //         }
    //     else{
    //         router.push('/register/seller')

    //     }
    //   },[])
  useEffect(() => {
    const config = {
      type: 'bar',
      data: {
        labels: [
          'January',
          'February',
          'March',
          'April',
          'May',
          'June',
          'July',
          "August" ,
          "September" ,
          "October" ,
          "November", 
          "December",
        ],
        datasets: [
          {
            label: new Date().getFullYear(),
            backgroundColor: '#ed64a6',
            borderColor: '#ed64a6',
            data: [30, 78, 56, 34, 100, 45, 13,45,45,45,46,12],
            fill: false,
            barThickness: 8,
          },
          {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: '#4c51bf',
            borderColor: '#4c51bf',
            data: [27, 68, 86, 74, 10, 4, 87,10,12,22,45,96],
            barThickness: 8,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          legend: {
            labels: {
              fontColor: 'rgba(0,0,0,.4)',
            },
            align: 'end',
            position: 'bottom',
          },
        },
        scales: {
          x: {
            display: false,
            title: {
              display: true,
              text: 'Month',
            },
            grid: {
              display: false,
              borderDash: [2],
              borderDashOffset: [2],
              color: 'rgba(33, 37, 41, 0.3)',
              zeroLineColor: 'rgba(33, 37, 41, 0.3)',
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },
          y: {
            display: true,
            title: {
              display: false,
              text: 'Value',
            },
            grid: {
              display: true,
              borderDash: [2],
              drawBorder: false,
              borderDashOffset: [2],
              color: 'rgba(33, 37, 41, 0.2)',
              zeroLineColor: 'rgba(33, 37, 41, 0.15)',
              zeroLineBorderDash: [2],
              zeroLineBorderDashOffset: [2],
            },
          },
        },
      },
    };

    const ctx = document.getElementById('bar-chart') as HTMLCanvasElement | null;
    if (ctx) {
      const myBar = new Chart(ctx, config);
      return () => {
        myBar.destroy();
      };
    }
  }, []);
 
  useEffect(() => {
    axios
      .get('http://127.0.0.1:5000/dash/getReclam')
      .then((res) => {
        const Data: [] = res.data;
        setReclamation(Data);
       const reclamation1= Data.filter((item)=>{item.createdAt.getFullYear()===new Date().getFullYear()}).sort()
       const reclamtion2 = Data.filter((item2)=>{item2.createdAt.getFullYear()===new Date().getFullYear()-1}).sort()
       setGraph(reclamation1)
       setGraph2(reclamtion2)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  

  return (
    <div  className="flex-row lg:flex ">
 <SideBare/> 
 <div className="  overflow-y-auto">
 
      <div className="relative bg-blueGray-800 md:pt-32 pb-32  mt-[-2%] " style={{"background-color": "#1e293b"}}>
        <div className="px-4 md:px-10 mx-auto w-full">
          <div>
            {/* Card stats */}
            <div className="flex flex-wrap mt-[-7%]">
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="total revenue"
                  statTitle={total1}
                  statArrow="up"
                  statPercent="3.48"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="far fa-chart-bar"
                  statIconColor="bg-red-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="subscription rev"
                  statTitle={total}
                  statArrow="down"
                  statPercent="3.48"
                  statPercentColor="text-red-500"
                  statDescripiron="Since last week"
                  statIconName="fas fa-chart-pie"
                  statIconColor="bg-orange-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="SALES number"
                  statTitle={Data1.length}
                  statArrow="down"
                  statPercent="1.10"
                  statPercentColor="text-orange-500"
                  statDescripiron="Since yesterday"
                  statIconName="fas fa-users"
                  statIconColor="bg-pink-500"
                />
              </div>
              <div className="w-full lg:w-6/12 xl:w-3/12 px-4">
                <CardStats
                  statSubtitle="client number"
                  statTitle={Data.length}
                  statArrow="up"
                  statPercent="12"
                  statPercentColor="text-emerald-500"
                  statDescripiron="Since last month"
                  statIconName="fas fa-percent"
                  statIconColor="bg-lightBlue-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl float-left w-3/5 h-44 p-4 ml-1  " >
  <div className='flex justify-between mt-[9%]'>
            
 </div>
<div>
  

<div className="relative overflow-x-auto ml-[50px] mt-[-20%] w-[1150px]">

  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded" >
        <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full max-w-full flex-grow flex-1">
              <h6 className="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
                Performance
              </h6>
              <h2 className="text-blueGray-700 text-xl font-semibold">
                Total orders
              </h2>
            </div>
          </div>
        </div>
        <div className="p-4 flex-auto">
          {/* Chart */}
          <div className="relative h-350-px">
            <canvas id="bar-chart"></canvas>
          </div>
        </div>
      </div>
   
</div>
<div>
<div className="relative">
<div className=" flex  rounded-md w-[1220px] h-[50%] overflow-x-scroll ml-[15px]">
{cordoner.map((el, index) => (
   el.seller.items.length > 0 && (
  <div key={index} style={{ "paddingRight": "0%" }}>
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
        <tr>
          <th scope="col" className="px-6 py-3">
            <div className="flex items-center">
              <a style={{ "marginLeft": "15px", 'fontSize': '20px' }}>
              
             <center> <img src={el.seller.image}
                className="w-10 h-auto rounded-full"
                style={{ "marginLeft": "0%" }} alt={`${el.seller.name}'s profile`} />
              <span className="ml-2">{el.seller.name}</span></center>
             
            
              </a>
            </div>
          </th>
        </tr>
      </thead>
      <tbody className="bg-grey-light flex flex-col items-center justify-between overflow-y-scroll w-full" style={{"height": "20vh"}}>
        <tr className="bg-white dark:bg-gray-800">
          <th scope="row" className="px-6 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          
          </th>
        </tr>

        {el.seller.items.map((item, i) => (
          <React.Fragment key={i}>
            <tr className="bg-white dark:bg-gray-800">
              <th scope="row" className="px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <img src={item.images[0]}
                  style={{ "width": "100%" }} alt="" />
              </th>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
              <th scope="row" className="px-6  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <span className='ml-[8%]'>{item.name}</span><br/>
                <span className='ml-[8%]'>{item.price}</span>
              </th>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
)))}

 
   
</div>

</div>
 </div>
  </div>
</div>
       

        </div>
    </div>
  


  )
}

export default HomePage