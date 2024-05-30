"use client";
import { useEffect, useState, useCallback, ChangeEvent } from "react";
import SEARCHICON from "@/assets/icons/seach.svg";
import WHITE_BOT_ICON from "@/assets/icons/white-bot.svg";
import LOGO from "@/assets/images/logo-growth-tools.png";
import CookieHandler, { TOKEN } from "@/helpers/cookie";
import LocalStorageHandler, { ORDER_TOOLS, LATEST_TOOLS } from "@/helpers/localStorage";
import { useAuthContext } from "@/hooks/AuthContext";
import { cn } from "@/lib/utils";
import { AlignJustify, Layers3, Moon, PencilRuler, Plus, Sun } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button, buttonVariants } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { usePathname } from "next/navigation";
import { useGlobalStoreContext } from "@/hooks/GlobalStoreContext";
import { supabase } from "@/lib/supabaseClient";

export function AuthHeader() {

  const [theme, setTheme] = useState('light');
  const [categoryHandle, setCategoryHandle] = useState('');
  const { setToolsInfoData, setOrderToolsData, setLatestToolsData } = useGlobalStoreContext();
  const [searchTerm, setSearchTerm] = useState('');

  const { isLoggedIn } = useAuthContext();
  const pathName = usePathname();

  const handleLogout = useCallback(() => {
    CookieHandler.remove(TOKEN);
    LocalStorageHandler.clear();
    window.location.reload();
  }, []);

  const onToggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
  }

  useEffect(() => {
    const name = pathName.split("/")[1];
    setCategoryHandle(name);
    setSearchTerm('');
  }, [pathName])

  useEffect(() => {
    // Check for saved theme in local storage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.add(savedTheme);
    }
  }, []);

  const fetchResults = useCallback(async (query: string) => {
    if (categoryHandle === "") {
      const orderToolsStringify = LocalStorageHandler.get(ORDER_TOOLS)
      if (orderToolsStringify) {

        const orderTools: any = JSON.parse(orderToolsStringify);
        if (query === "") {
          setOrderToolsData(orderTools)
          return;
        }
        const searchedOrderTools = orderTools.filter((orderTool: any) => orderTool.name.toLowerCase().includes(query.toLowerCase()))
        setOrderToolsData(searchedOrderTools)
        return;
      }
    }
    if (categoryHandle === "latest-tools") {
      const latestToolsStringify = LocalStorageHandler.get(LATEST_TOOLS)
      if (latestToolsStringify) {

        const latestTools: any = JSON.parse(latestToolsStringify);
        if (query === "") {
          setLatestToolsData(latestTools)
          return;
        }
        const searchedLatestTools = latestTools.filter((orderTool: any) => orderTool.name.toLowerCase().includes(query.toLowerCase()))
        setLatestToolsData(searchedLatestTools)
        return;
      }
    }
    if (categoryHandle === "profile") {
      return;
    }
    const { data: categoryData, error: categoryError } = await supabase.from('categories').select('id').eq('handle', `/${categoryHandle}`)
    const categoryId = categoryData ? categoryData[0].id : "";
    const { data, error } = await supabase
      .from('tools')
      .select('*')
      .ilike('name', `%${query}%`)
      .eq('category_id', categoryId);
    
    if (error) {
      console.error('Error fetching data:', error);
      setToolsInfoData([]);
      return;
    }
    setToolsInfoData(data);
  }, [categoryHandle, setOrderToolsData, setToolsInfoData, setLatestToolsData]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    const handler = setTimeout(() => {
      fetchResults(e.target.value);
    }, 300); // Adjust debounce delay as needed

    return () => {
      clearTimeout(handler);
    };
  }, [fetchResults])

  return (
    <>
      <div className="z-50 px-12 py-4 items-center justify-between xl:flex hidden">
        <Link href={"/"}>
          <Image
            width={LOGO.width}
            height={LOGO.height}
            alt="logo"
            src={LOGO.src}
          />
        </Link>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Input
              value={searchTerm}
              onChange={handleChange}
              className={cn("ml-auto rounded-full h-10", isLoggedIn ? "w-[290px]" : "w-[400px]")}
              type="search"
              placeholder="Search..."
            />
            <Button
              size="icon"
              className="p-[6px] w-8 h-8 absolute top-1/2 -translate-y-1/2 right-1"
            >
              <Image src={SEARCHICON} alt="search" className="w-5" style={{width:'auto', height:'auto'}}/>
            </Button>
          </div>
          <div onClick={onToggleTheme}>
            <Button size="icon" variant="ghost" className="mx-3">
              { theme === 'light' ? <Sun className="w-6" /> : <Moon className="w-6"/>}
            </Button>
          </div>
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-800 hover:to-blue-600">
            <Image src={WHITE_BOT_ICON} alt="search" className="w-5" />
            Try AI Search
          </Button>
          <Link
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex items-center gap-2"
            )}
            href={
              isLoggedIn ? "/submit-tool" : "/sign-in?redirect=/submit-tool"
            }
          >
            <Plus className="w-5" />
            Submit Tool
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "flex items-center gap-2"
                )}
                href={"/profile"}
              >
                <PencilRuler className="w-5" />
                Profile
              </Link>
              <Button onClick={handleLogout}>Logout</Button>
            </>
          ) : (
            <Link className={cn(buttonVariants())} href="/sign-up">
              Sign Up
            </Link>
          )}
        </div>
      </div>
      
      <div>
        <div className="w-full flex p-4 xl:hidden items-center justify-between h-14">
          <div className="flex items-center">
            <div className={cn("block lg:hidden", categoryHandle === "categories" ? "hidden" : "")}>
                <Link className="relative group" href={'/categories'}>
                    <div className="relative flex overflow-hidden items-center justify-center rounded-full w-[50px] h-[50px] transform transition-all ring-0 ring-gray-300 hover:ring-8 group-focus:ring-4 ring-opacity-30">
                        <div className="flex flex-col justify-between w-[20px] h-[20px] transform transition-all duration-300 origin-center overflow-hidden">
                            <div className="bg-gray-900 h-[2px] w-7 origin-left" />
                            <div className="bg-gray-900 h-[2px] w-7 rounded" />
                            <div className="bg-gray-900 h-[2px] w-7 origin-left" />
                        </div>
                    </div>
                </Link>
            </div>
            <Link href={"/"}>
              <Image
                width={LOGO.width}
                height={LOGO.height}
                alt="logo"
                className="ml-2"
                src={LOGO.src}
              />
            </Link>
          </div>
          <div className="flex justify-between">
            <div className="flex items-center ml-auto">
              <div className="relative hidden xs:block">
                <Input
                  value={searchTerm}
                  onChange={handleChange}
                  className="ml-auto rounded-full h-10 w-full sm:w-[300px] md:w-[350px] lg:w-[400px]"
                  type="search"
                  placeholder="Search..."
                />
                <Button
                  size="icon"
                  className="p-[6px] w-8 h-8 absolute top-1/2 -translate-y-1/2 right-1"
                >
                  <Image src={SEARCHICON} alt="search" className="w-5" style={{width:'auto', height:'auto'}}/>
                </Button>
              </div>
              <Button size="icon" variant="ghost" className="mx-0 sm:mx-3" onClick={onToggleTheme}>
                { theme === 'light' ? <Sun className="w-6" /> : <Moon className="w-6"/>}
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <AlignJustify />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-auto border-none">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-400 hover:from-blue-800 hover:to-blue-600">
                        <Image src={WHITE_BOT_ICON} alt="search" className="w-5" style={{width: 'auto', height: 'auto'}}/>
                        Try AI Search
                      </Button>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="block">
                      <Link
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "w-full flex items-center gap-2 border"
                        )}
                        href={
                          isLoggedIn
                            ? "/submit-tool"
                            : "/sign-in?redirect=/submit-tool"
                        }
                      >
                        <Plus className="w-5" />
                        Submit Tool
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="block">
                      <Link
                        className={cn(
                          buttonVariants({ variant: "outline" }),
                          "w-full flex items-center gap-2 border"
                        )}
                        href={"/categories"}
                      >
                        <Layers3 className="w-5" />
                        Categories
                      </Link>
                    </DropdownMenuItem>
                    {isLoggedIn && (
                      <DropdownMenuItem className="block">
                        <Link
                          className={cn(
                            buttonVariants({ variant: "outline" }),
                            "flex items-center gap-2"
                          )}
                          href={"/profile"}
                        >
                          <PencilRuler className="w-5" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="block">
                      {isLoggedIn ? (
                        <Button className="w-full" onClick={handleLogout}>
                          Logout
                        </Button>
                      ) : (
                        <Link
                          className={cn(
                            buttonVariants({ variant: "default" }),
                            "w-full"
                          )}
                          href="/sign-up"
                        >
                          Sign Up
                        </Link>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
        <div className="w-full block xs:hidden py-4 px-6">
          <div className="relative w-full">
            <Input
              value={searchTerm}
              onChange={handleChange}
              className="ml-auto rounded-full h-10 w-full"
              type="search"
              placeholder="Search..."
            />
            <Button
              size="icon"
              className="p-[6px] w-8 h-8 absolute top-1/2 -translate-y-1/2 right-1"
            >
              <Image src={SEARCHICON} alt="search" className="w-5" style={{width:'auto', height:'auto'}}/>
            </Button>
          </div>
        </div>
      </div>
      <Separator />
    </>
  );
}
