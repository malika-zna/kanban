// "use client"
// import React, { useEffect, useState } from 'react'

// export default function Home() {
//   const key = "kunciStorage"

//   const [data, setData] = useState<number>(() => {
//     if (typeof window !== "undefined") {
//       const savedData = localStorage.getItem(key);
//       return savedData ? Number(savedData) : 0;
//     }
//     return 0;
//   });

//   // useEffect(() => {
//   //   const savedData = localStorage.getItem(key);
//   //   setData(savedData ? Number(savedData) : 0);
//   // }, []);

//   useEffect(() => {
//     localStorage.setItem(key, JSON.stringify(data));
//   }, [data]);

//   return (
//     <>
//       <div>page</div>
//       <p>{data}</p>
//       <button className='p-5 bg-black/5 w-fit hover:bg-black/10'
//         onClick={() => setData((prev) => prev + 1)}
//       >add</button>
//     </>
//   )
// }



// SOLUSI WORKED
// "use client"
// import React, { useEffect, useState } from 'react'

// export default function Home() {
//   const key = "kunciStorage";
//   const [data, setData] = useState<number>(0);
//   const [isMounted, setIsMounted] = useState(false);

//   useEffect(() => {
//     const savedData = localStorage.getItem(key);
//     if (savedData) {
//       setData(Number(savedData));
//     }
//     setIsMounted(true);
//   }, []);

//   useEffect(() => {
//     if (isMounted) {
//       localStorage.setItem(key, JSON.stringify(data));
//     }
//   }, [data, isMounted]);

//   if (!isMounted) {
//     return null;
//   }

//   return (
//     <>
//       <div>page</div>
//       <p>{data}</p>
//       <button className='p-5 bg-black/5 w-fit hover:bg-black/10'
//         onClick={() => setData((prev) => prev + 1)}
//       >add</button>
//     </>
//   )
// }


// COBA COBA
"use client"
import React, { useEffect, useState } from 'react'

export default function Home() {
  const key = "kunciStorage";
  const [typed, setTyped] = useState<string>("");
  const [data, setData] = useState<string[]>([]);
  // const [data, setData] = useState<string[]>(() => {
  //   if (typeof window !== "undefined") {
  //     const savedData = localStorage.getItem(key);
  //     if (savedData) return JSON.parse(savedData);
  //   }
  //   return [];
  // });
  const [isMounted, setIsMounted] = useState<boolean>(false);

  // ismounted fungsinya memastikan data dari localstrage sudah disimpan ke state

  useEffect(() => {
    const loadData = async () => {
      const savedData = localStorage.getItem(key);
      setData(JSON.parse(savedData ? savedData : "[]"));
      setIsMounted(true)
    };

    loadData();
  }, [])

  useEffect(() => {
    if (isMounted)
      localStorage.setItem(key, JSON.stringify(data));
  }, [data
    , isMounted
  ])

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setData((prev) => [...prev, typed]);
    e.target.reset();
  }

  if (!isMounted) return;

  return (
    <>
      <div>page</div>
      <p>data: {data}</p>
      <form onSubmit={handleSubmit}>
        <input type="text" required
          onChange={(e) => setTyped(e.target.value)} />
        <button type='submit'>submit</button>
      </form>
      <button onClick={() => { localStorage.removeItem(key); setData([]); }}>clear</button>
    </>
  )
}