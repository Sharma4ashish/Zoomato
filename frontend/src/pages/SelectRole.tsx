
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { authService } from '../main'
import { useAppData } from '../context/AppContext'


type Role = "customer" | "seller" | "rider" | null

function SelectRole() {
    const [role, setRole] = useState<Role>(null)
    const {setUser} = useAppData()

    const roles :Role[] = ["customer", "seller", "rider"]

    const addRoleFunc = async ()=>{ 
        try {
            const {data} = await axios.put(`${authService}/api/auth/add/role`, {role}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            localStorage.setItem("token", data.token);
            setUser(data.user);
        } catch (error) {
            alert("Error adding role. Please try again.")
            console.log(error);
        } 
    }


  return (
    <div className='flex min-h-screen items-center justify-center bg-white px-4'>
        <div className='w-full max-w-sm space-y-6'>
            <h1 className='text-center text-2xl font-bold'>Choose Your Role</h1>
            <div className='space-y-4'>
                {
                    roles.map((r)=>(                        
                        <button key={r}
                        onClick={() => setRole(r)}
                        className={`w-full rounded-xl border px-4 py-3  font-medium capitalize transition ${
                            role === r ? "border-[#E23744] bg-[#E23744] text-white " : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100" 
                        } `}
                        >
                        {`Continue as ${r}`}
                        </button>
                    ))
                }

                <button onClick={addRoleFunc} disabled={!role} className='w-full rounded-xl bg-[#E23744] px-4 py-3 font-medium text-white disabled:cursor-not-allowed disabled:bg-gray-300'>
                    Continue
                </button>

            </div>

        </div>
    </div>
  )
}

export default SelectRole