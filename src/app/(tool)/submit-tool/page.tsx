"use client";

import { AddDealCard } from "@/components/common/add-deal-card";
import { ButtonUpload } from "@/components/common/button-upload";
import { DealCard } from "@/components/common/deal-card";
import { Button } from "@/components/ui/button";
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
import { Separator } from "@/components/ui/separator";
import { regexFloat } from "@/helpers/regex";
import { ChangeEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export default function SubmitToolPage() {
  const [editModal, setEditModal] = useState(false);
  const [deal, setDeal] = useState<Deal>({
    id: "",
    price: "",
    salePrice: "",
    title: "",
  });

  const form = useForm<SubmitToolForm>({
    defaultValues: {
      name: "",
      shortDescription: "",
      description: "",
      website: "",
      logo: "",
      deal: [
        {
          id: uuidv4(),
          price: "10",
          salePrice: "4.99",
          title: "Lifetime 50% off",
        },
      ],
    },
  });

  const currentDeals = form.getValues("deal");

  const handleEditDeal = useCallback((data: Deal) => {
    setDeal(data);
    setEditModal(true);
  }, []);

  const handleUpdateDeal = useCallback(() => {
    form.setValue(
      "deal",
      currentDeals?.map((item) => (item.id === deal.id ? deal : item))
    );

    setEditModal(false);
  }, [currentDeals, deal, form]);

  const onSubmit = async (data: SubmitToolForm) => {
    console.log(data);
  };

  return (
    <section>
      <div className="container">
        <div className="grid grid-cols-[minmax(0,_1fr)_400px] gap-2 md:gap-6 my-10">
          <div>
            <h3 className="font-bold text-[32px] mb-6">
              Post your tool to a global audience
            </h3>
            <p className="font-medium text-description text-base">
              We&apos;re always looking for the most innovative tools to share
              with our audiences. Use our form to submit yours today.
            </p>
            <Separator className="my-10" />

            <Dialog
              open={editModal}
              onOpenChange={(open) => setEditModal(open)}
            >
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-semibold mb-4">
                    Update deal
                  </DialogTitle>
                  <DialogDescription className="pb-6">
                    This action cannot be undone. This will permanently delete
                    your account and remove your data from our servers.
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
                    <Button onClick={handleUpdateDeal} className="h-12 px-6">
                      Update
                    </Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>

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
                        <ButtonUpload {...field} />
                      </FormControl>
                      <FormDescription>
                        png, svg formats. 5mb max
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <div>
                  <h4 className="font-semibold mb-4 text-[18px]">Deals</h4>
                  <div className="grid grid-cols-2 gap-[30px]">
                    {form?.watch("deal").map((item) => (
                      <DealCard
                        key={item?.id}
                        title={item.title}
                        price={item.price}
                        salePrice={item.salePrice}
                        onEdit={() => handleEditDeal(item)}
                        onRemove={() => {}}
                      />
                    ))}

                    <AddDealCard title={"Create new"} onClick={() => {}} />
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4 text-[18px]">
                    Key Features
                  </h4>
                  <p className="text-label3 text-base mb-4">
                    Sed ut perspiciatis unde omnis iste natus{" "}
                  </p>
                  <div className="grid grid-cols-2 gap-[30px]"></div>
                </div>
                <div className="pt-9">
                  <Button
                    type="submit"
                    className="w-full h-14 text-[18px] font-bold"
                  >
                    Apply
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
