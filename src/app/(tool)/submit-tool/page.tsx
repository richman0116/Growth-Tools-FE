"use client";

import { ToolCard } from "@/components/cards/tool-card";
import { AddDealCard } from "@/components/common/add-deal-card";
import { DealCard } from "@/components/common/deal-card";
import { UploadIcon } from "@/components/icons/UploadIcon";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { regexFloat } from "@/helpers/regex";
import { toastError } from "@/helpers/toasts";
import { cn } from "@/lib/utils";
import { getCategoriesList } from "@/services/category";
import { getSubscriptions } from "@/services/subscription";
import { SubmitToolRequest, submitTool } from "@/services/tool";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check, ChevronDown } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { ChangeEvent, useCallback, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export default function SubmitToolPage() {
  const [editModal, setEditModal] = useState(false);
  const [keyModal, setKeyModal] = useState("");
  const [logoPreview, setFilePreview] = useState<string>("");
  const [thumbnailPreview, setThumbnailPreview] = useState<string>("");
  const [deal, setDeal] = useState<Deal>({
    id: "",
    price: "",
    salePrice: "",
    title: "",
  });

  const { data: subscriptions } = useQuery({
    queryKey: ["subscription"],
    queryFn: getSubscriptions,
  });

  const { data: categories } = useQuery({
    queryKey: ["category"],
    queryFn: getCategoriesList,
  });

  const submitToolWithSubs = useMutation({
    mutationFn: (data: SubmitToolRequest) => submitTool(data),
    mutationKey: ["submit-tool"],
    onSuccess(data, variables, context) {
      console.log(data);
    },
    onError: (error, variables, _context) => {
      toastError(
        error?.message ?? "Oop's! Something wrong when try to submit tool"
      );
    },
  });

  const form = useForm<SubmitToolForm>({
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      website: "",
      deal: [
        {
          id: uuidv4(),
          price: "10",
          salePrice: "4.99",
          title: "Lifetime 50% off",
        },
      ],
      features: [
        { value: "https://shadcn.com" },
        { value: "http://twitter.com/shadcn" },
      ],
      useCases: [
        { value: "https://shadcn.com" },
        { value: "http://twitter.com/shadcn" },
      ],
      price: "0",
      free: false,
      category: "",
      subscription: "",
    },
  });

  const { fields, append } = useFieldArray({
    name: "features",
    control: form.control,
  });

  const { fields: filedsUseCase, append: appendUseCase } = useFieldArray({
    name: "useCases",
    control: form.control,
  });

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    form.setValue("logo", file);
    file && setFilePreview(URL.createObjectURL(file));
  };

  const handleUploadThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    form.setValue("thumbnail", file);
    file && setThumbnailPreview(URL.createObjectURL(file));
  };

  const currentDeals = form.getValues("deal");

  const handleEditDeal = useCallback(
    (key: "update" | "create", data?: Deal) => {
      data && key === "update" && setDeal(data);
      setKeyModal(key);
      setEditModal(true);
    },
    []
  );

  const handleCreateDeal = useCallback(() => {
    form.setValue("deal", [...currentDeals, deal]);
    setDeal({
      id: uuidv4(),
      price: "",
      salePrice: "",
      title: "",
    });
    setEditModal(false);
  }, [currentDeals, deal, form]);

  const handleUpdateDeal = useCallback(() => {
    form.setValue(
      "deal",
      currentDeals?.map((item) => (item.id === deal.id ? deal : item))
    );
    setDeal({
      id: uuidv4(),
      price: "",
      salePrice: "",
      title: "",
    });
    setEditModal(false);
  }, [currentDeals, deal, form]);

  const handleDeleteDeal = useCallback(
    (id: string) => {
      form.setValue(
        "deal",
        currentDeals?.filter((item) => item.id !== id)
      );
    },
    [currentDeals, form]
  );

  const editModalComp = () => {
    return (
      <Dialog open={editModal} onOpenChange={(open) => setEditModal(open)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-semibold mb-4">
              {keyModal === "create" ? "Create deal" : "Update deal"}
            </DialogTitle>
            <DialogDescription className="pb-6">
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
            <div className="grid grid-cols-1 gap-4">
              <Input
                className="h-12 px-6"
                value={deal?.title}
                onChange={(e) =>
                  setDeal((prv) => ({
                    ...prv,
                    title: e.target.value,
                  }))
                }
              />
              <Input
                prefix="USD"
                className="h-12 px-6"
                value={deal?.price}
                onChange={(e) =>
                  setDeal((prv) => ({
                    ...prv,
                    price: regexFloat.test(e.target.value)
                      ? e.target.value
                      : "",
                  }))
                }
              />
              <Input
                prefix="USD"
                className="h-12 px-6"
                value={deal?.salePrice}
                onChange={(e) =>
                  setDeal((prv) => ({
                    ...prv,
                    salePrice: regexFloat.test(e.target.value)
                      ? e.target.value
                      : "",
                  }))
                }
              />
              <Button
                onClick={
                  keyModal === "create" ? handleCreateDeal : handleUpdateDeal
                }
                className="h-12 px-6"
              >
                {keyModal === "create" ? "Create" : "Update"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  };

  const onSubmit = async (data: SubmitToolForm) => {
    const mapToolDeal = data?.deal.map((item) => ({
      name: item?.title,
      descriptions: item?.title,
      price: +item?.price,
      discountPrice: +item?.salePrice,
    }));

    submitToolWithSubs.mutate({
      name: data?.name,
      shortDescription: data?.description,
      description: data?.shortDescription,
      website: data?.website,
      toolDeals: mapToolDeal,
      keyFeatures: data?.features.map((data) => data.value),
      useCases: data?.useCases.map((data) => data.value),
      price: +data?.price,
      categoryId: data?.category,
      subscriptionId: data?.subscription,
    });
  };

  return (
    <section>
      {editModalComp()}

      <div className="container">
        <div className="grid grid-1 md:grid-cols-[minmax(0,_1fr)_400px] gap-2 md:gap-28 my-10">
          <div className="mb-6">
            <h3 className="font-bold text-[32px] mb-6">
              Post your tool to a global audience
            </h3>
            <p className="font-medium text-description text-base">
              We&apos;re always looking for the most innovative tools to share
              with our audiences. Use our form to submit yours today.
            </p>
            <Separator className="my-10" />

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-10"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="font-semibold text-[18px]">
                        Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-14 px-6"
                          placeholder="Name"
                          {...field}
                          value={field.value as unknown as any}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="shortDescription"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="font-semibold text-[18px]">
                        Short Description
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-14 px-6"
                          placeholder="e.g. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="font-semibold text-[18px]">
                        Description
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-14 px-6"
                          placeholder="e.g. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to "
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="website"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="font-semibold text-[18px]">
                        Website
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-14 px-6"
                          placeholder="https://"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {"(must include 'https://')"}
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="logo"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="font-semibold text-[18px]">
                        Logo
                      </FormLabel>

                      <FormControl>
                        <div className="relative w-max">
                          {logoPreview && (
                            <div className="relative overflow-hidden mb-4 rounded-2xl shadow-md">
                              <Image
                                id="upload-avatar"
                                src={logoPreview}
                                width={160}
                                height={160}
                                alt="file-preview"
                                className="overflow-hidden"
                              />
                            </div>
                          )}
                          <Button
                            className={cn(
                              "flex gap-2 cursor-pointer rounded-full w-max text-base font-medium h-12"
                            )}
                            variant="outline"
                            size="lg"
                          >
                            Upload
                            <UploadIcon />
                          </Button>
                          <input
                            type="file"
                            className={
                              "cursor-pointer absolute top-0 left-0 h-full w-full opacity-0"
                            }
                            onChange={handleUploadImage}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        png, svg formats. 5mb max
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="thumbnail"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="font-semibold text-[18px]">
                        Thumbnail
                      </FormLabel>

                      <FormControl>
                        <div className="relative w-max">
                          {thumbnailPreview && (
                            <div className="relative overflow-hidden mb-4 rounded-2xl shadow-md">
                              <Image
                                id="upload-thumbnail"
                                src={thumbnailPreview}
                                width={160}
                                height={160}
                                alt="file-preview"
                                className="overflow-hidden"
                              />
                            </div>
                          )}
                          <Button
                            className={cn(
                              "flex gap-2 cursor-pointer rounded-full w-max text-base font-medium h-12"
                            )}
                            variant="outline"
                            size="lg"
                          >
                            Upload
                            <UploadIcon />
                          </Button>
                          <input
                            type="file"
                            className={
                              "cursor-pointer absolute top-0 left-0 h-full w-full opacity-0"
                            }
                            onChange={handleUploadThumbnail}
                          />
                        </div>
                      </FormControl>
                      <FormDescription>
                        png, svg formats. 5mb max
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <div>
                  <h4 className="font-semibold mb-4 text-[18px]">Deals</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {form?.watch("deal").map((item) => (
                      <DealCard
                        key={item?.id}
                        title={item.title}
                        price={item.price}
                        salePrice={item.salePrice}
                        onEdit={() => handleEditDeal("update", item)}
                        onRemove={() => handleDeleteDeal(item.id)}
                      />
                    ))}

                    <AddDealCard
                      title={"Create new"}
                      onClick={() => handleEditDeal("create")}
                    />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4 text-[18px]">
                    Key Features
                  </h4>
                  <p className="text-label3 text-base mb-4">
                    Sed ut perspiciatis unde omnis iste natus{" "}
                  </p>
                  <div className="grid gap-4">
                    {fields.map((field, index) => (
                      <FormField
                        control={form.control}
                        key={field.id}
                        name={`features.${index}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder=""
                                className="h-12 px-6"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                    <Button
                      variant="link"
                      className="text-secondary p-0 h-max flex justify-start"
                      onClick={() => append({ value: "" })}
                    >
                      Add Key Features +
                    </Button>
                    <p className="text-label3 text-base mb-4">
                      Maximum 15 words per each
                    </p>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4 text-[18px]">Use Cases</h4>
                  <p className="text-label3 text-base mb-4">
                    Sed ut perspiciatis unde omnis iste natus{" "}
                  </p>
                  <div className="grid gap-4">
                    {filedsUseCase.map((field, index) => (
                      <FormField
                        control={form.control}
                        key={field.id}
                        name={`features.${index}.value`}
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                placeholder=""
                                className="h-12 px-6"
                                {...field}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    ))}
                    <Button
                      variant="link"
                      className="text-secondary p-0 h-max flex justify-start"
                      onClick={() => appendUseCase({ value: "" })}
                    >
                      Add Use Case +
                    </Button>
                    <p className="text-label3 text-base mb-4">
                      Maximum 25 words per each
                    </p>
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="space-y-4">
                      <FormLabel className="font-semibold text-[18px]">
                        Price
                      </FormLabel>
                      <FormControl>
                        <Input className="h-14 px-6" suffix="USD" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="free"
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-2 space-y-0 !my-6">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-secondary border-secondary"
                        />
                      </FormControl>
                      <div className="leading-none font-normal text-label2 text-sm">
                        <FormLabel>Free</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel className="font-semibold text-[18px] mb-3">
                        Category
                      </FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between h-14 shadow-md border-input",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? categories?.find(
                                    (category) => category.id === field.value
                                  )?.name
                                : "Select category"}
                              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          align="start"
                          className="w-full md:min-w-96 p-0"
                        >
                          <Command>
                            <CommandInput placeholder="Search language..." />
                            <CommandEmpty>No language found.</CommandEmpty>
                            <CommandGroup>
                              {categories?.map((category) => (
                                <CommandItem
                                  value={category.id}
                                  key={category.id}
                                  onSelect={() => {
                                    form.setValue("category", category.id);
                                  }}
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      category.id === field.value
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                  {category.name}
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subscription"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Card>
                        <CardHeader>
                          <CardTitle className="font-semibold text-[18px] mb-2">
                            Subscriptions
                          </CardTitle>
                          <CardDescription>
                            Please select Subscriptions
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                          <RadioGroup
                            onValueChange={field.onChange}
                            className="grid grid-cols-3 gap-4"
                          >
                            {subscriptions?.map((sub) => (
                              <div key={sub.id}>
                                <RadioGroupItem
                                  value={sub.id}
                                  id={sub.id}
                                  className="peer sr-only"
                                />
                                <Label
                                  htmlFor={sub.id}
                                  className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary relative"
                                >
                                  <span className="absolute -top-4 text-white bg-black py-1 px-2 rounded-lg text-base shadow-lg">
                                    {sub?.name}
                                  </span>
                                  <p className="relative py-14 text-center">
                                    <b className="text-[64px] font-bold text-secondary">
                                      {sub?.price}
                                    </b>
                                    <span className="absolute font-medium">
                                      {sub?.currency}
                                    </span>
                                    <span className="text-white bg-secondary inline-block rounded-full mt-3 capitalize px-4 py-1">
                                      {sub?.interval}
                                    </span>
                                  </p>
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </CardContent>
                      </Card>
                    </FormItem>
                  )}
                />
                <div className="pt-9">
                  <Button
                    type="submit"
                    className="w-full h-14 text-[18px] font-bold"
                  >
                    Publish
                  </Button>
                </div>
              </form>
            </Form>
          </div>
          <div>
            <h3 className="font-semibold text-[18px] mb-4">Card Preview</h3>
            <ToolCard
              variant="thumbnail"
              id={"new-tool"}
              title={form.watch("name")}
              description={form.watch("shortDescription")}
              thumbnail={thumbnailPreview as unknown as StaticImageData}
              logo={logoPreview as unknown as StaticImageData}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
