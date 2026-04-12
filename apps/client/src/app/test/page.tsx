import { auth } from "@clerk/nextjs/server";

const TestPage = async () => {
  const { getToken } = await auth();
  const token = await getToken();

  const resProducts = await fetch("http://localhost:8000/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const dataProducts = await resProducts.json();      
  console.log(dataProducts)


  const resOrder = await fetch("http://localhost:8001/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const dataOrder = await resOrder.json();      
  console.log(dataOrder)
  

  const resPayment= await fetch("http://localhost:8002/test", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  const dataPayment = await resPayment.json();      
  console.log(dataPayment)
  
  return <div>TestPage - Services not yet configured</div>;
};

export default TestPage;