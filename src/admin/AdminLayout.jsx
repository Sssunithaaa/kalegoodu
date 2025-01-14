import { Outlet, useNavigate } from "react-router-dom";
import Header from '../admin/header/Header'

import { useSelector } from "react-redux";
import { useEffect } from "react";
const AdminLayout = () => {
  const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.auth);
  // const userState = useSelector((state) => state.user);

  // const {
  //   data: profileData,
  //   isLoading: profileIsLoading,
  //   error: profileError,
  // } = useQuery({
  //   queryFn: () => {
  //     return getUserProfile({ token: userState.userInfo.token });
  //   },
  //   queryKey: ["profile"],
  //   onSuccess: (data) => {
  //     if (!data?.admin) {
  //       navigate("/");
  //       toast.error("Your are not allowed to access admin panel");
  //     }
  //   },
  //   onError: (err) => {
  //     console.log(err);
  //     navigate("/");
  //     toast.error("Your are not allowed to access admin panel");
  //   },
  // });
  const profileIsLoading = false;
  useEffect(()=>{
    if(!isAuthenticated)
      navigate("/login")
    
  },[])
  if (profileIsLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <h3 className="text-2xl text-slate-700">Loading...</h3>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row">
      <Header />
      <main className="bg-[#F9F9F9] flex-1 p-4 lg:p-6 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
