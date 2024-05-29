'use client'
import React, { useState, useEffect } from "react";
import Image from "next/image"
import Placeholder from "@/assets/images/placeholder.png";
import { cn } from "@/lib/utils";
import { supabase } from "@/lib/supabaseClient";
import { Prize } from '../icons/Prize';
import GasIcon from '../icons/gas';
import { BadgeDollarSign } from "lucide-react";
import { SkeletonTable } from "../common/skeleton-table";

const SuperAdminDashboard = () => {

  const [toolInfos, setToolInfos] = useState([])
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedValue, setSelectedValue] = useState("10");
  const [pageViewButtonCount, setPageViewButtonCount] = useState(1);
  const [toolInfosPerPage, setToolInfosPerPage] = useState([]);
  const [categories, setCategories] = useState([]);

  const [isHorizontalDropdownOpen, setIsHorizontalDropdownOpen] = useState("");

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return text;
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.slice(0, maxLength - 3) + '...';
    }
  }

  const fetchToolInfos = async () => {
    const { data, error } = await supabase.from('tools').select('*').order('created_at', { ascending: true });
    if (error) {
      setToolInfos([]);
      return;
    }
    const tool_infos: any = data ? data : [];
    setToolInfos(tool_infos);
  }

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) {
      setCategories([]);
      return;
    }
    const fetched_categories: any = data ? data : [];
    setCategories(fetched_categories);
  
  }
  useEffect(() => {
    fetchToolInfos();
    fetchCategories();
  }, [])

  useEffect(() => {
    const page_View_Button_Count = Math.floor(toolInfos.length / parseInt(selectedValue)) + 1;
    setPageViewButtonCount(page_View_Button_Count)
    const toolsPerPage = toolInfos.slice((pageNumber - 1) * parseInt(selectedValue), (pageNumber - 1) * parseInt(selectedValue) + parseInt(selectedValue))
    setToolInfosPerPage(toolsPerPage)
  }, [pageNumber, selectedValue, toolInfos])

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value)
    setPageNumber(1);
  }

  const handlePrevious = () => {
    if (pageNumber === 1) {
      return;
    } else {
      setPageNumber(prev => prev - 1)
    }
  }
  
  const handleNext = () => {
    if (pageNumber === pageViewButtonCount) {
      return;
    } else {
      setPageNumber(prev => prev + 1)
    }
  }

  const getCategoryName = (categoryId: string) => {
    const categoryInfo: any = categories.filter((category: any) => category?.id === categoryId)?.[0];
    const name = categoryInfo ? categoryInfo.name : "";
    return name;
  }

  const handleToolAction = (toolId: string) => {
    setIsHorizontalDropdownOpen(toolId)
  }

  const addPeerReview = async (toolId: string) => {
    setIsHorizontalDropdownOpen("");
    await supabase.from('tools').update({ peer_reviewed_status: true }).eq('id', toolId);
    fetchToolInfos();
  }
  
  const removePeerReview = async (toolId: string) => {
    setIsHorizontalDropdownOpen("");
    await supabase.from('tools').update({ peer_reviewed_status: false }).eq('id', toolId);
    fetchToolInfos();
  }
  
  const addTrending = async (toolId: string) => {
    setIsHorizontalDropdownOpen("");
    await supabase.from('tools').update({ trending_status: true }).eq('id', toolId);
    fetchToolInfos();
  }
  
  const removeTrending = async (toolId: string) => {
    setIsHorizontalDropdownOpen("");
    await supabase.from('tools').update({ trending_status: false }).eq('id', toolId);
    fetchToolInfos();
  }
  
  const addPublish = async (toolId: string) => {
    setIsHorizontalDropdownOpen("");
    await supabase.from('tools').update({ status: "published" }).eq('id', toolId);
    fetchToolInfos();
  }
  
  const removePublish = async (toolId: string) => {
    setIsHorizontalDropdownOpen("");
    await supabase.from('tools').update({ status: "pending" }).eq('id', toolId);
    fetchToolInfos();
  }

  return (
    <>
      <section className="h-auto min-h-[70vh] flex flex-col gap-6 p-4 md:px-8 md:py-8" onClick={() => {setIsHorizontalDropdownOpen("")}}>
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium font-satoshi">Show</p>
            <select value={selectedValue} onChange={handleChange}  className="border-2 rounded-md font-satoshi">
              {[10, 20, 30, 40, 50, 100, 200].map((value, index) => (
                <option key={index}>{value}</option>
              ))}
            </select>  
          </div>
          {/* <button className="font-clash text-sm bg-[#743cde] text-white rounded-md px-4 py-2 flex items-center gap-3"><Plus size={17} /><p className="mt-[2px]">Add Tool</p></button> */}
        </div>
        <div className='w-full overflow-auto border'>
          <table className="">
            <thead className="dark:bg-[#211b41]">
              <tr className="font-clash text-sm">
                <th className='px-5 py-4'>Name</th>
                <th className='px-5 py-4'>Logo</th>
                <th className="whitespace-nowrap px-5 py-4">Short Description</th>
                <th className='px-5 py-4'>Description</th>
                <th className='px-5 py-4'>Website</th>
                <th className="whitespace-nowrap px-5 py-4">Key Features</th>
                <th className='px-5 py-4'>Screenshots</th>
                <th className='px-5 py-4'>Deals</th>
                <th className='px-5 py-4'>Usecases</th>
                <th className='px-5 py-4'>Price</th>
                <th className='px-5 py-4'>Status</th>
                <th className='px-5 py-4'>Category</th>
                <th className="whitespace-nowrap px-5 py-4">Tier Category</th>
                <th className='whitespace-nowrap px-5 py-4'>Total Views</th>
                <th className='whitespace-nowrap px-5 py-4'>Monthly Views</th>
                <th className='whitespace-nowrap px-5 py-4'>Total Claps</th>
                <th className='whitespace-nowrap px-5 py-4'>Total Deals</th>
                <th className='whitespace-nowrap px-5 py-4'>Peer Review Status</th>
                <th className='whitespace-nowrap px-5 py-4'>Trending Status</th>
                <th className="whitespace-nowrap px-5 py-4">Deal Status</th>
                <th className='px-5 py-4'>Order</th>
                <th className='px-5 py-4'>Action</th>
              </tr>
            </thead>
            <tbody className="">
            {
              toolInfosPerPage.length === 0 ? <tr><td colSpan={22} className="px-5"><SkeletonTable /></td></tr>
                :
              toolInfosPerPage.map((toolData: any, index) => (
                <React.Fragment key={index}>
                  <tr className="text-center font-satoshi odd:bg-gray-200 even:bg-white text-xs odd:dark:bg-[#2b234d] even:dark:bg-[#211b41]">
                    <td className="py-5">{truncateText(toolData.name, 13)}</td>
                    <td><Image src={toolData.logo ? toolData.logo : Placeholder} width={32} height={27} alt="tool logo" className="m-auto" /></td>
                    <td>{truncateText(toolData.short_description, 13)}</td>
                    <td>{truncateText(toolData.description, 13)}</td>
                    <td>{truncateText(toolData.website, 13)}</td>
                    <td>{truncateText(toolData.key_features, 13)}</td>
                    <td>{truncateText(toolData.screenshots,13)}</td>
                    <td>{""}</td>
                    <td>{truncateText(toolData.use_cases, 13)}</td>
                    <td>{toolData.price}</td>
                    <td><div className={cn("w-[85px] py-1.5 rounded-full m-auto", toolData.status === "published" ? "bg-green-200 text-green-500" : "bg-red-200 text-red-500")}>{toolData.status}</div></td>
                    <td>{getCategoryName(toolData.category_id)}</td>
                    <td>{toolData.tier_category}</td>
                    <td className='whitespace-nowrap'>{toolData.tool_view_count}</td>
                    <td className='whitespace-nowrap'>{toolData.monthly_view_count[0]}</td>
                    <td className='whitespace-nowrap'>{toolData.clap_count}</td>
                    <td className='whitespace-nowrap'>{toolData.deal_count}</td>
                    <td>{!toolData.peer_reviewed_status ? '' : <div className='flex justify-center items-center'><Prize /></div> }</td>
                    <td>{!toolData.trending_status ? '' : <div className='flex justify-center items-center'><GasIcon /></div>}</td>
                    <td>{!toolData.trending_status ? '' : <div className='flex justify-center items-center'><BadgeDollarSign className="w-5" /></div>}</td>
                    <td>{toolData.order}</td>
                    <td>
                      <button
                        id="dropdownMenuIconHorizontalButton"
                        onClick={(e) => {e.stopPropagation(), e.preventDefault(), handleToolAction(toolData.id)}}
                        className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-gray-300 rounded-full hover:bg-gray-400 dark:text-white dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        type="button"
                      >
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                          <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                        </svg>
                      </button>
                      {isHorizontalDropdownOpen === toolData.id && (
                        <div id="dropdownDotsHorizontal" className="absolute right-10 z-10 bg-gray-200 divide-y divide-gray-300 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                          <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
                            <li className='hover:bg-gray-400'>
                              {
                                !toolData.peer_reviewed_status ? <button className="block px-4 p-2" onClick={() => addPeerReview(toolData.id)}>Add Peer Review</button>
                                  :
                                <button className="block px-4 py-2" onClick={() => removePeerReview(toolData.id)}>Remove Peer Review</button>
                              }
                            </li>
                            <li className='hover:bg-gray-400'>
                              {
                                !toolData.trending_status ? <button className="block px-4 py-2" onClick={() => addTrending(toolData.id)}>Add Trending</button>
                                  :
                                  <button className="block px-4 py-2" onClick={() => removeTrending(toolData.id)}>Remove Trending</button>
                              }
                            </li>
                            <li className='hover:bg-gray-400'>
                              {
                                toolData.status !== "published" ? <button className="block px-4 py-2" onClick={() => addPublish(toolData.id)}>Add Publish</button>
                                  :
                                <button className="block px-4 py-2" onClick={() => removePublish(toolData.id)}>Remove Publish</button>
                              }
                            </li>
                          </ul>
                        </div>
                      )}
                    </td>
                  </tr>
                  
                </React.Fragment>
              ))
            }
            </tbody>
          </table>
        </div>
        {
          pageViewButtonCount === 1 ? ''
            :
          <div className="flex items-center justify-center gap-2">
            <button onClick={handlePrevious} className="font-satoshi">Previous</button>
            <div className="flex gap-2">
              {Array.from({ length: pageViewButtonCount }, (_, index) => (
                <button key={index} className={cn(" py-1 px-3 rounded-sm font-clash text-black dark:text-black", index + 1 === pageNumber ? "bg-[#743cde]" : "bg-[#e0e0e0]")} onClick={() => {setPageNumber(index + 1)}}>{index + 1}</button>
              ))}
            </div>
            <button onClick={handleNext} className="font-satoshi">Next</button>
          </div>
        }
      </section>
    </>
  )
}

export default SuperAdminDashboard