import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import type { CreateVendorData, VendorType } from "@/hooks/useVendors";

const vendorTypes: { value: VendorType; labelKey: string }[] = [
  { value: "caterer", labelKey: "caterer" },
  { value: "decorator", labelKey: "decorator" },
  { value: "photographer", labelKey: "photographer" },
  { value: "musician", labelKey: "musician" },
  { value: "florist", labelKey: "florist" },
  { value: "planner", labelKey: "planner" },
  { value: "other", labelKey: "other" },
];

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  type: z.enum(["caterer", "decorator", "photographer", "musician", "florist", "planner", "other"]),
  description: z.string().max(500).optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  phone: z.string().max(20).optional(),
  price_range: z.string().max(50).optional(),
});

type FormData = z.infer<typeof formSchema>;

interface AddVendorDialogProps {
  onSubmit: (data: CreateVendorData) => Promise<any>;
  trigger: React.ReactNode;
}

export const AddVendorDialog = ({ onSubmit, trigger }: AddVendorDialogProps) => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "other",
      description: "",
      email: "",
      phone: "",
      price_range: "",
    },
  });

  const handleSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const vendorData: CreateVendorData = {
        name: data.name.trim(),
        type: data.type,
        description: data.description?.trim() || undefined,
        email: data.email?.trim() || undefined,
        phone: data.phone?.trim() || undefined,
        price_range: data.price_range?.trim() || undefined,
      };

      const result = await onSubmit(vendorData);
      if (result) {
        form.reset();
        setOpen(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("addVendor")}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("vendorName")} *</FormLabel>
                  <FormControl>
                    <Input placeholder="Acme Catering" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("vendorType")} *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {vendorTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {t(type.labelKey as any)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("description")}</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the vendor..." className="resize-none" rows={2} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("phone")}</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 234 567 890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="price_range"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("priceRange")}</FormLabel>
                  <FormControl>
                    <Input placeholder="$500 - $2000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                {t("cancel")}
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : t("save")}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
