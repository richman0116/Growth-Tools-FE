import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Overlay } from "../common/overlay";
import { Filter } from "../icons/Filter";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { supabase } from "@/lib/supabaseClient";
import { useGlobalStoreContext } from "@/hooks/GlobalStoreContext";

export const FilterPopoverTool = (props: {
  categories: any[];
}) => {
  const { categories } = props;
  const [open, setOpen] = useState(false);

  const { setOrderToolsData } = useGlobalStoreContext();

  const form = useForm<any>({
    defaultValues: {
      filter: {
        deals: false,
        trends: false,
      },
      categories: {
        "Design": false,
        "Email Marketing": false,
        "Social Media": false,
        "Customer Support": false,
        "File Management": false,
        "Project Management": false,
        "SEO": false,
        "Marketing": false,
        "Influencer Management": false,
        "Content": false,
        "Ads Management": false,
        "AI": false,
        "Trending Tools": false,
        "Analytics": false,
        "Productivity": false,
        "Admin": false
      },
      sortBy: "name",
    },
  });

  const handleReset = () => {
    form.reset();
    form.reset({
      sortBy: 'name'
    })
  }

  const contentForm = () => {
    return (
      <div className={cn("grid gap-6")}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} >
            <div className="flex gap-2">
              <div className="space-y-6">
                <h4 className="font-semibold flex justify-between items-center font-clash text-base text-black dark:text-white">
                  Filter
                </h4>
                <div className="grid grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="filter.deals"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-secondary border-secondary w-5 h-5"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none font-medium text-label2 text-sm dark:text-white">
                          <FormLabel>Deals</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="filter.trends"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-[state=checked]:bg-secondary border-secondary w-5 h-5"
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none font-medium text-label2 text-sm dark:text-white">
                          <FormLabel>Trends</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
                <h4 className="font-semibold text-base font-clash text-black dark:text-white">Categories</h4>

                <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                  {categories?.map((category) => {
                    return (
                      <FormField
                        key={category.name}
                        control={form.control}
                        name={`categories.${category.name}`}
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                                className="data-[state=checked]:bg-secondary border-secondary w-5 h-5"
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none font-medium text-label2 text-sm font-satoshi dark:text-white">
                              <FormLabel>{category.name}</FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    );
                  })}
                </div>
                <h4 className="font-semibold text-base font-clash text-black dark:text-white">Sort by</h4>
                <div className="grid grid-cols-1 gap-6">
                  <FormField
                    control={form.control}
                    name="sortBy"
                    render={({ field }) => (
                      <FormItem className="space-y-3">
                        <FormControl>
                          <RadioGroup
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            className="grid grid-cols-3 gap-3"
                          >
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                  <RadioGroupItem
                                      className="w-5 h-5 dark:text-white"
                                      value="rating"
                                  />
                              </FormControl>
                              <FormLabel className="font-medium text-label2 font-satoshi text-sm dark:text-white">Rating</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="name-DESC" />
                              </FormControl>
                              <FormLabel className="font-medium text-label2 font-satoshi text-sm dark:text-white">A-Z</FormLabel>
                            </FormItem>
                            <FormItem className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value="name-ASC" />
                              </FormControl>
                              <FormLabel className="font-medium text-label2 font-satoshi text-sm dark:text-white">Z-A</FormLabel>
                            </FormItem>
                          </RadioGroup>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <span
                className="text-secondary font-bold cursor-pointer text-sm dark:text-white"
                onClick={handleReset}
                >
                  Reset
              </span>
            </div>
            <div className="pt-8">
              <Button type="submit" className="w-full p-6 font-bold text-base font-clash">
                Apply
              </Button>
            </div>
          </form>
        </Form>
      </div>
    );
  };

  const triggerButton = () => {
    return (
      <div
        className={cn(
          "cursor-pointer py-2 px-4 flex items-center gap-3 rounded-full shadow-sm dark:bg-[#0c0a09] dark:shadow-gray-400",
          open
            ? "bg-gradient-to-r from-blue-700 to-blue-500 text-white"
            : "bg-gray-50"
        )}
      >
        <Filter fill={open ? "white" : "#1855D9"} />
        <span
          className={cn(
            "text-sm font-satoshi dark:text-[#1855D9]",
            open ? "text-white dark:text-white" : "text-secondary"
          )}
        >
          Filter
        </span>
      </div>
    );
  };

  const onSubmit = async (data: any) => {
    console.log(data)
    let toolsDataInfo;
    let baseQuery = supabase
      .from('tools')
      .select(`
        *,
        categories (
          id,
          name
        )
      `);
    switch (data.sortBy) {
      case "rating":
        baseQuery = baseQuery.order('order', { ascending: false });
        break;
      case "name-ASC":
        baseQuery = baseQuery.order('name', { ascending: true });
        break;
      case "name-DESC":
        baseQuery = baseQuery.order('name', { ascending: false });
        break;
    }

    const { data: toolsData, error } = await baseQuery;
    if (error) {
      setOrderToolsData([])
      return;
    }

    toolsDataInfo = toolsData.filter(item => item.trending_status === data.filter.trends || item.deal_status === data.filter.deals);

    const selectedCategories = Object.keys(data.categories).filter(key => data.categories[key] === true);
    toolsDataInfo = toolsDataInfo.filter(item => selectedCategories.includes(item.categories.name))
    setOrderToolsData(toolsDataInfo)
  };

  return (
    <>
      <div className="hidden md:block">
        {open && <Overlay />}
        <Popover onOpenChange={(open: boolean) => setOpen(open)}>
          <PopoverTrigger>{triggerButton()}</PopoverTrigger>
          {open ?
            <PopoverContent align="start" className="rounded-2xl md:w-[412px] max-h-[90vh] overflow-y-auto">
              {contentForm()}
            </PopoverContent> : "" }
        </Popover>
      </div>
      <div className="block md:hidden">
        <Dialog onOpenChange={(open: boolean) => setOpen(open)}>
          <DialogTrigger asChild>{triggerButton()}</DialogTrigger>
          {open ?
            <DialogContent className="p-4 w-[90%] rounded-2xl" hideIconClose>
              {contentForm()}
            </DialogContent> : ""}
        </Dialog>
      </div>
    </>
  );
};
