import { Link, useNavigate } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";

// import { images } from "../../../../constants";
import { useEffect, useState } from "react";
import { AiFillDashboard, AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaComments, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import NavItem from "./NavItem";
import NavItemCollapse from "./NavItemCollapse";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import { logout } from "../../store/actions";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { createPost } from "../../../../services/index/posts";

const Header = () => {
  const navigate = useNavigate();
  // const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [activeNavName, setActiveNavName] = useState("dashboard");
  const windowSize = useWindowSize();

  // const { mutate: mutateCreatePost, isLoading: isLoadingCreatePost } =
  //   useMutation({
  //     mutationFn: ({ slug, token }) => {
  //       return createPost({
  //         token,
  //       });
  //     },
  //     onSuccess: (data) => {
  //       queryClient.invalidateQueries(["posts"]);
  //       toast.success("Post is created, edit that now!");
  //       navigate(`/admin/posts/manage/edit/${data.slug}`);
  //     },
  //     onError: (error) => {
  //       toast.error(error.message);
  //       console.log(error);
  //     },
  //   });

  const toggleMenuHandler = () => {
    setIsMenuActive((prevState) => !prevState);
  };

  useEffect(() => {
    if (windowSize.width < 1024) {
      setIsMenuActive(false);
    } else {
      setIsMenuActive(true);
    }
  }, [windowSize.width]);

  // const handleCreateNewPost = ({ token }) => {
  //   mutateCreatePost({ token });
  // };
  
  const dispatch = useDispatch()
  const handleLogout = ()=>{
    dispatch(logout());
    
  }

  return (
    <header className="flex h-fit z-[1001] w-full items-center justify-between p-4 lg:h-full lg:max-w-[300px] lg:flex-col lg:items-start lg:justify-start lg:p-0">
      {/* logo */}
      <Link to="/">
        {/* <img src={images.Logo} alt="logo" className="w-16 lg:hidden" /> */}
      </Link>
    
      <div className="cursor-pointer lg:hidden">
        {isMenuActive ? (
          <AiOutlineClose className="w-6 h-6" onClick={toggleMenuHandler} />
        ) : (
          <AiOutlineMenu className="w-6 h-6" onClick={toggleMenuHandler} />
        )}
      </div>
      {/* sidebar container */}
      {isMenuActive && (
        <div className="fixed inset-0 lg:static lg:h-full lg:w-full">
          {/* underlay */}
          <div
            className="fixed inset-0 bg-black opacity-50 lg:hidden"
            onClick={toggleMenuHandler}
          />
          {/* sidebar */}
          <div className="fixed top-0 bottom-0 left-0 z-50 w-3/4 overflow-y-auto bg-white p-4 lg:static lg:h-full lg:w-full lg:p-6">
            <Link to="/">
              {/* <img src={images.Logo} alt="logo" className="w-16" /> */}
            </Link>
            <h4 onClick={()=>navigate("/")} className="text-center text-2xl font-bold text-[#343131]">Kalegoodu</h4>
            {/* menu items */}
            <div className="mt-6 flex flex-col gap-y-[0.563rem]">
              <NavItem
                title="Dashboard"
                link="/admin"
                icon={<AiFillDashboard className="text-xl" />}
                name="dashboard"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
              <NavItemCollapse
                title="Categories"
                icon={<MdDashboard className="text-xl" />}
                name="Categories"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              >
                <Link to="/admin/categories/manage">Manage all categories</Link>
                <Link
                to="/admin/categories/add"
                  // disabled={isLoadingCreatePost}
                  className="text-start disabled:opacity-60 disabled:cursor-not-allowed"
                  // onClick={() =>
                  //   handleCreateNewPost({ token: userState.userInfo.token })
                  // }
                >
                  Add New Category
                </Link>
                {/* <Link to="/admin/categories/manage">Categories</Link> */}
              </NavItemCollapse>

              <NavItemCollapse
                title="Products"
                icon={<MdDashboard className="text-xl" />}
                name="Products"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              >
                <Link to="/admin/products/manage">Manage all products</Link>
                <Link
                to="/admin/products/add"
                  // disabled={isLoadingCreatePost}
                  className="text-start disabled:opacity-60 disabled:cursor-not-allowed"
                  // onClick={() =>
                  //   handleCreateNewPost({ token: userState.userInfo.token })
                  // }
                >
                  Add New Product
                </Link>
                {/* <Link to="/admin/categories/manage">Categories</Link> */}
              </NavItemCollapse>

              <NavItem
                title="Banner"
                link="/admin/banner"
                icon={<FaUser className="text-xl" />}
                name="users"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
              <NavItem
                title="Sale Types"
                link="/admin/sale-types/manage"
                icon={<MdDashboard className="text-xl" />}
                name="sale-types"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
              <NavItem
                title="Orders"
                link="/admin/orders/manage"
                icon={<MdDashboard className="text-xl" />}
                name="orders"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
             <NavItemCollapse
                title="Workshops"
                icon={<MdDashboard className="text-xl" />}
                name="Workshops"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              >
                <Link to="/admin/workshops/manage">Manage workshops</Link>
                <Link
                to="/admin/workshops/add"
                  // disabled={isLoadingCreatePost}
                  className="text-start disabled:opacity-60 disabled:cursor-not-allowed"
                  
                >
                   Add workshops
                </Link>
                {/* <Link to="/admin/categories/manage">Categories</Link> */}
              </NavItemCollapse>
             
               <NavItemCollapse
                title="Testimonials"
                icon={<MdDashboard className="text-xl" />}
                name="Testimonials"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              >
                <Link to="/admin/comments/manage">Manage all testimonials</Link>
                <Link
                to="/admin/comments/add"
                  // disabled={isLoadingCreatePost}
                  className="text-start disabled:opacity-60 disabled:cursor-not-allowed"
                  // onClick={() =>
                  //   handleCreateNewPost({ token: userState.userInfo.token })
                  // }
                >
                  Add New Testimonial
                </Link>
                {/* <Link to="/admin/categories/manage">Categories</Link> */}
              </NavItemCollapse>
               <NavItemCollapse
                title="Details"
                icon={<MdDashboard className="text-xl" />}
                name="Details"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              >
                <Link to="/admin/about-us/manage">About us</Link>
                <Link
                to="/admin/details/manage"
                  // disabled={isLoadingCreatePost}
                  className="text-start disabled:opacity-60 disabled:cursor-not-allowed"
                  
                >
                   Policy, Terms and conditions
                </Link>
                 <Link
                to="/admin/text/manage"
                  // disabled={isLoadingCreatePost}
                  className="text-start disabled:opacity-60 disabled:cursor-not-allowed"
                  
                >
                   Scrolling-text and banner-text
                </Link>
                {/* <Link to="/admin/categories/manage">Categories</Link> */}
              </NavItemCollapse>
               <NavItem
                title="Promotional Emails"
                link="/admin/send-emails"
                icon={<AiFillDashboard className="text-xl" />}
                name="emails"
                activeNavName={activeNavName}
                setActiveNavName={setActiveNavName}
              />
            </div>
            <Button className="px-8 mt-5" onClick={handleLogout}>Logout</Button>
          </div>
          
        </div>
      )}
    </header>
  );
};

export default Header;
