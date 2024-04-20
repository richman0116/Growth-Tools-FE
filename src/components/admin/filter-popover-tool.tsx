import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Filter } from "../icons/Filter";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from "../ui/dialog";
import { Overlay } from "../common/overlay";
import { getCategoryList } from "../../services/tool";

// const filter = [
//   {
//     label: "Deals",
//     value: "Deals",
//   },
//   {
//     label: "Trends",
//     value: "Trends",
//   },
// ];

// const categories = [
//   {
//     label: "Analytics",
//     value: "Analytics",
//   },
//   {
//     label: "Design",
//     value: "Design",
//   },
//   {
//     label: "Productivity",
//     value: "Productivity",
//   },
//   {
//     label: "Email Marketing",
//     value: "Email Marketing",
//   },
//   {
//     label: "Customer Support",
//     value: "Customer Support",
//   },
//   {
//     label: "File Management",
//     value: "File Management",
//   },
//   {
//     label: "Content",
//     value: "Content",
//   },
//   {
//     label: "Productivity",
//     value: "Productivity",
//   },
//   {
//     label: "SEO",
//     value: "SEO",
//   },
//   {
//     label: "Social Media",
//     value: "Social Media",
//   },
// ];

export const FilterPopoverTool = (props: {
  categories: Category[];
  onSubmitFilter: (
    category?: Category,
    sort?: string,
    order?: "ASC" | "DESC"
  ) => void;
}) => {
  const { categories, onSubmitFilter } = props;
  const [open, setOpen] = useState(false);

  const form = useForm<Filters>({
    defaultValues: {
      //   filter: {
      //     deals: false,
      //     trends: false,
      //   },
      //   categories: {
      //     analytics: false,
      //     content: false,
      //     customerSupport: false,
      //     design: false,
      //     emailMarketing: false,
      //     fileManagement: false,
      //     productivity: false,
      //     seo: false,
      //     socialMedia: false,
      //   },
      categories: categories?.map((category) => {
        return {
          [category.name]: false,
        };
      }),
      sortBy: "name",
    },
  });

  const contentForm = () => {
    return (
      <div className={cn("grid gap-6")}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* <h4 className="font-semibold text-[16px] flex justify-between items-center">
              Filter
              <span
                className="text-secondary font-bold cursor-pointer text-sm"
                onClick={() => form.reset()}
              >
                Reset
              </span>
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
                    <div className="space-y-1 leading-none font-medium text-label2 text-sm">
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
                    <div className="space-y-1 leading-none font-medium text-label2 text-sm">
                      <FormLabel>Trends</FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            </div> */}
            <h4 className="font-semibold text-[16px]">Categories</h4>

            <div className="grid grid-cols-2 gap-6">
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
                        <div className="space-y-1 leading-none font-medium text-label2 text-sm">
                          <FormLabel>{category.name}</FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                );
              })}
            </div>
            <h4 className="font-semibold text-[16px]">Sort by:</h4>
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
                        {/* <FormItem className="flex items-center space-x-3 space-y-0">
                                                    <FormControl>
                                                        <RadioGroupItem
                                                            className="w-5 h-5"
                                                            value="rating"
                                                        />
                                                    </FormControl>
                                                    <FormLabel className="font-normal">Rating</FormLabel>
                                                </FormItem> */}
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="name-DESC" />
                          </FormControl>
                          <FormLabel className="font-normal">A-Z</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="name-ASC" />
                          </FormControl>
                          <FormLabel className="font-normal">Z-A</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="pt-9">
              <Button type="submit" className="w-full h-12 font-bold text-base">
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
          "cursor-pointer py-2 px-4 flex items-center gap-3 rounded-full",
          open
            ? "bg-gradient-to-r from-blue-700 to-blue-500 text-white"
            : "bg-gray-50"
        )}
      >
        <Filter fill={open ? "white" : "#1855D9"} />
        <span
          className={cn(
            "text-sm text-secondary",
            open ? "text-white" : "text-secondary"
          )}
        >
          Filter
        </span>
      </div>
    );
  };

  const onSubmit = async (data: Filters) => {
    console.log("====================================");
    console.log("data", data);
    console.log("====================================");
    let categoryName = "";
    for (const key in data.categories) {
      if (data.categories.hasOwnProperty(key)) {
        // Check if the property value is true
        if (data.categories[key]) {
          // Add the key to the list of true properties
          categoryName = key;
        }
      }
    }
    const category = categories.find(
      (category) => category.name === categoryName
    );
    const sort = data.sortBy?.split("-")[0] ?? "name";
    const order = data.sortBy?.split("-")[1] ?? "DESC";
    console.log("====================================");
    console.log("sortsortsort", sort);
    console.log("orderorderorderorder", order);
    console.log("====================================");
    onSubmitFilter(category, sort, order as "ASC" | "DESC");
  };

  return (
    <>
      <div className="hidden md:block">
        {open && <Overlay />}
        <Popover onOpenChange={(open: boolean) => setOpen(open)}>
          <PopoverTrigger>{triggerButton()}</PopoverTrigger>
          <PopoverContent align="start" className="rounded-2xl md:w-[412px]">
            {contentForm()}
          </PopoverContent>
        </Popover>
      </div>
      <div className="block md:hidden">
        <Dialog onOpenChange={(open: boolean) => setOpen(open)}>
          <DialogTrigger asChild>{triggerButton()}</DialogTrigger>
          <DialogContent className="p-4 w-[90%] rounded-2xl" hideIconClose>
            {contentForm()}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};
