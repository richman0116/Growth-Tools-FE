"use client";

import { ToolCard } from "@/components/cards/tool-card";
import { AddDealCard } from "@/components/common/add-deal-card";
import { DealCard } from "@/components/common/deal-card";
import { Icons } from "@/components/common/icon";
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
    FormMessage,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Check, ChevronDown } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

const formSchema = z.object({
    name: z
        .string()
        .min(10, {
            message: "Name must be at least 10 characters.",
        })
        .max(50),
    shortDescription: z
        .string()
        .min(10, {
            message: "Short description must be at least 10 characters.",
        })
        .max(150),
    description: z
        .string()
        .min(10, {
            message: "Description must be at least 10 characters.",
        })
        .max(300),
    website: z.string().min(1, { message: "Please add your website" }),
    deal: z
        .object({
            id: z.string(),
            price: z.string(),
            salePrice: z.string(),
            title: z.string(),
        })
        .array(),
    features: z
        .object({
            value: z.string(),
        })
        .array()
        .min(1, { message: "Please add at least one key feature" }),
    useCases: z
        .object({
            value: z.string(),
        })
        .array()
        .min(1, { message: "Please add at least one use case" }),
    price: z.string().optional(),
    free: z.boolean().optional(),
    category: z.string().min(1, { message: "Please select category" }),
    subscription: z.string().min(1, { message: "Please select subscription" }),
});

export default function SubmitToolPage() {
    const { push } = useRouter();
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

    const form = useForm<SubmitToolForm>({
        defaultValues: {
            name: "",
            shortDescription: "",
            description: "",
            website: "",
            deal: [],
            features: [{ value: "http://twitter.com/shadcn" }],
            useCases: [{ value: "http://twitter.com/shadcn" }],
            price: "0",
            free: false,
            category: "",
            subscription: "",
        },
        resolver: zodResolver(formSchema),
    });

    const { fields, append: appendFeatures, remove: removeFeatures } = useFieldArray({
        name: "features",
        control: form.control,
    });

    const { fields: filedsUseCase, append: appendUseCase } = useFieldArray({
        name: "useCases",
        control: form.control,
    });

    const { fields: fieldScreenshots } = useFieldArray({
        name: "screenshots",
        control: form.control,
    });

    const handleUploadThumbnail = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target?.files;
        if (files && files.length > 0) {
            const fileArray = Array.from(files).map((file) => ({ value: file }));
            form.setValue("screenshots", fileArray);
        }
        files?.length && setThumbnailPreview(URL.createObjectURL(files[0]));
    };

    const handleUploadImage = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target?.files?.[0];
        form.setValue("logo", file);
        file && setFilePreview(URL.createObjectURL(file));
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
                            Adding a tool&apos;s deal
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
                                prefix="Price"
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
                                prefix="Discount"
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

        const formData = new FormData();
        formData.append("name", data?.name);
        formData.append("shortDescription", data?.description);
        formData.append("description", data?.shortDescription);
        formData.append("website", data?.website);
        formData.append("toolDeals", [] as any);
        formData.append(
            "keyFeatures",
            JSON.stringify(data?.features.map((data) => data.value))
        );
        formData.append(
            "useCases",
            JSON.stringify(data?.useCases.map((data) => data.value))
        );
        formData.append("price", !!data?.free ? "0" : data?.price);
        formData.append("categoryId", data?.category);
        formData.append("subscriptionId", data?.subscription);
        formData.append("logo", data.logo!);
        data.screenshots?.forEach((screenshot) => {
            formData.append("screenshots", screenshot.value);
        });

        try {
            const response = await submitTool(
                formData as unknown as SubmitToolRequest
            );

            if (!response) {
                toastError("Oop's! Something wrong when try to submit tool");
                form.reset();
            }

            push(response?.url);
        } catch (error) {
            toastError("Oop's! Something wrong when try to submit tool");
            form.reset();
        }
    };

    useEffect(() => {

        console.log('====================================');
        console.log('getFieldState', form.getFieldState('name'));
        console.log('====================================');
    }, [])

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
                                            <FormMessage />
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
                                                    maxLength={100}
                                                    placeholder="e.g. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
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
                                                    maxLength={300}
                                                    placeholder="e.g. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, to "
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
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
                                            <FormMessage />
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
                                                                id="upload-logo"
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
                                                            "flex gap-2 cursor-pointer rounded-full w-max text-base font-medium h-12 overflow-hidden relative"
                                                        )}
                                                        variant="outline"
                                                        size="lg"
                                                    >
                                                        Upload
                                                        <UploadIcon />
                                                        <input
                                                            type="file"
                                                            className={
                                                                "cursor-pointer absolute top-0 left-0 h-full w-full opacity-0"
                                                            }
                                                            onChange={handleUploadImage}
                                                        />
                                                    </Button>
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                            <FormDescription>
                                                png, svg formats. 5mb max
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="screenshots"
                                    render={({ field }) => (
                                        <FormItem className="space-y-4">
                                            <FormLabel className="font-semibold text-[18px]">
                                                Screenshots
                                            </FormLabel>
                                            <FormControl>
                                                <>
                                                    <div className="flex gap-6">
                                                        {fieldScreenshots?.map((item, i) => (
                                                            <div
                                                                key={`screenshot-${i}`}
                                                                className=" relative w-max"
                                                            >
                                                                {item && (
                                                                    <div className="relative overflow-hidden mb-4 rounded-2xl shadow-md">
                                                                        <Image
                                                                            id="upload-thumbnail"
                                                                            src={URL.createObjectURL(item.value)}
                                                                            width={160}
                                                                            height={160}
                                                                            alt="file-preview"
                                                                            className="overflow-hidden"
                                                                        />
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    <Button
                                                        className={cn(
                                                            "flex gap-2 cursor-pointer rounded-full w-max text-base font-medium h-12 overflow-hidden relative"
                                                        )}
                                                        variant="outline"
                                                        size="lg"
                                                    >
                                                        Upload
                                                        <UploadIcon />
                                                        <input
                                                            type="file"
                                                            multiple
                                                            className={
                                                                "cursor-pointer absolute top-0 left-0 h-full w-full opacity-0"
                                                            }
                                                            onChange={handleUploadThumbnail}
                                                        />
                                                    </Button>
                                                </>
                                            </FormControl>
                                            <FormMessage />
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
                                <FormField
                                    control={form.control}
                                    name="features"
                                    render={({ field }) => (
                                        <FormItem className="space-y-4">
                                            <FormLabel className="font-semibold text-[18px]">
                                                Key Features
                                            </FormLabel>
                                            <p className="text-label3 text-base mb-4">
                                                Sed ut perspiciatis unde omnis iste natus{" "}
                                            </p>
                                            <FormControl>
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
                                                                            max={100}
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
                                                        onClick={() => appendFeatures({ value: "http://twitter.com/shadcn" })}
                                                    >
                                                        Add Key Features +
                                                    </Button>
                                                    <p className="text-label3 text-base mb-4">
                                                        Maximum 15 words per each
                                                    </p>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="useCases"
                                    render={({ field }) => (
                                        <FormItem className="space-y-4">
                                            <FormLabel className="font-semibold text-[18px]">
                                                Use Cases
                                            </FormLabel>
                                            <p className="text-label3 text-base mb-4">
                                                Sed ut perspiciatis unde omnis iste natus{" "}
                                            </p>
                                            <FormControl>
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
                                                        onClick={() => appendUseCase({ value: "http://twitter.com/shadcn" })}
                                                    >
                                                        Add Use Case +
                                                    </Button>
                                                    {/* <FormMessage /> */}
                                                    <p className="text-label3 text-base mb-4">
                                                        Maximum 25 words per each
                                                    </p>
                                                </div>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
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
                                            <FormMessage />
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
                                            <FormMessage />
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
                                                    {subscriptions?.map((sub) => (
                                                        <div key={sub.id}>
                                                            <input
                                                                type="radio"
                                                                id={`subscription-${sub.id}`}
                                                                className="hidden peer"
                                                                name="subscription-choosing"
                                                                value={sub.id}
                                                                onChange={field.onChange}
                                                            />
                                                            <p className="text-xs rounded-full bg-[#a855f7] relative top-3 left-4 w-fit p-1 text-white">
                                                                {sub.name}
                                                            </p>
                                                            <label
                                                                htmlFor={`subscription-${sub.id}`}
                                                                className="inline-flex 
                                                                items-center justify-between w-full 
                                                                p-5 text-gray-500 bg-white border-2 border-gray-200 rounded-xl cursor-pointer 
                                                                dark:hover:text-gray-300 dark:border-gray-700 peer-checked:border-[#a855f7]
                                                                hover:text-gray-600 dark:peer-checked:text-gray-300 peer-checked:text-gray-600 
                                                                hover:bg-gray-50 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                                                            >
                                                                <div className="block">
                                                                    <p className="dark:text-black">
                                                                        <span className="dark:text-black">${Number(sub.price)}{' '}</span>
                                                                        <span className="text-zinc-400 text line-through">
                                                                            ${Number(sub.discountPrice)}
                                                                        </span>
                                                                        /{sub.interval}
                                                                    </p>
                                                                    <p className="text-sm text-zinc-400">
                                                                        {sub.descriptions}
                                                                    </p>
                                                                </div>
                                                            </label>
                                                        </div>
                                                    ))}
                                                </CardContent>
                                            </Card>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="pt-9">
                                    <Button
                                        type="submit"
                                        disabled={form.formState.isSubmitSuccessful}
                                        className="w-full h-14 text-[18px] font-bold"
                                    >
                                        {form.formState.isSubmitSuccessful ? (
                                            <Icons.spinner className="mr-2 h-4 w-full animate-spin" />
                                        ) : (
                                            "Publish"
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </div>
                    <div>
                        <h3 className="font-semibold text-[18px] mb-4">Card Preview</h3>
                        <ToolCard
                            variant="thumbnail"
                            id={"#"}
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
