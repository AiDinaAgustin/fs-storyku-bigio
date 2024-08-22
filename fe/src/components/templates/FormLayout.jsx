import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input.jsx";
import { Textarea } from "@/components/ui/textarea.jsx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button.jsx";
import { ArrowLeft, Plus, X } from "lucide-react";
import ContentLayout from "@/components/templates/ContentLayout.jsx";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb.jsx";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import HeadingText from "@/components/atoms/HeadingText/index.jsx";
import { Link, NavLink } from "react-router-dom";
import { Badge } from "@/components/ui/badge.jsx";

export default function FormLayout({
  formData,
  categories,
  status,
  handleChange,
  handleSubmit,
  buttonText,
  title,
}) {
  return (
    <>
      <ContentLayout>
        <Breadcrumb className={`mb-5`}>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/story-management">
                Story Management
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{title} Stories</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <HeadingText text={`${title} Stories`} />
        <section className="my-5">
          <NavLink to={"/story-management"}>
            <Badge variant={`secondary`} className={`p-2 px-4 gap-1`}>
              <ArrowLeft size={14} />
              Back
            </Badge>
          </NavLink>
        </section>
        <form
          onSubmit={handleSubmit}
          className={`rounded-lg shadow-md p-5 mt-10`}
        >
          <section className="grid md:grid-cols-2 my-5 gap-5">
            <div className="w-full grid">
              <Label htmlFor="judul" className={`mb-2 font-semibold`}>
                Judul
              </Label>
              <Input
                id="judul"
                name="judul"
                type="text"
                placeholder="Judul"
                value={formData.judul}
                onChange={handleChange}
              />
            </div>
            <div className="w-full grid">
              <Label htmlFor="penulis" className={`mb-2 font-semibold`}>
                Nama Penulis
              </Label>
              <Input
                id="penulis"
                name="penulis"
                type="text"
                placeholder="Nama Penulis"
                value={formData.penulis}
                onChange={handleChange}
              />
            </div>
          </section>
          <section className="w-full grid">
            <Label htmlFor="sinopsis" className={`mb-2 font-semibold`}>
              Sinopsis
            </Label>
            <Textarea
              id="sinopsis"
              name="sinopsis"
              placeholder="Sinopsis"
              value={formData.sinopsis}
              onChange={handleChange}
            />
          </section>
          <section className="grid md:grid-cols-2 my-5 gap-5">
            <div className="w-full grid">
              <Label htmlFor="kategori" className={`mb-2 font-semibold`}>
                Kategori
              </Label>
              <Select
                onValueChange={(value) =>
                  handleChange({ target: { name: "kategori", value } })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full grid">
              <Label htmlFor="tags" className={`mb-2 font-semibold`}>
                Tags/Keyword Cerita{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger className={`text-sm text-primary/30`}>
                      (Pisahkan dengan koma)
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Contoh : Sci-fi,Action</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Label>
              <Input
                id="tags"
                name="tags"
                type="text"
                placeholder="Keyword/tags"
                value={formData.tags}
                onChange={handleChange}
              />
            </div>
          </section>
          <section className="grid md:grid-cols-2 my-5 gap-5">
            <div className="w-full grid">
              <Label htmlFor="sampul" className={`mb-2 font-semibold`}>
                Sampul
              </Label>
              <Input
                id="sampul"
                name="sampul"
                type="file"
                placeholder="Sampul"
                onChange={handleChange}
              />
            </div>
            <div className="w-full grid">
              <Label htmlFor="status" className={`mb-2 font-semibold`}>
                Status
              </Label>
              <Select
                onValueChange={(value) =>
                  handleChange({ target: { name: "status", value } })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Pilih status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {status.map((statusItem) => (
                      <SelectItem key={statusItem} value={statusItem}>
                        {statusItem}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </section>
          <div className="mt-10 flex justify-end gap-3">
            <Link to={"/story-management"}>
              <Button
                variant={`destructive`}
                className={`w-full md:w-max gap-1`}
                onClick={() => alert("Are you sure you want to cancel?")}
              >
                <X size={16} />
                Cancel
              </Button>
            </Link>
            <Button type="submit" className="w-full md:w-max flex gap-1">
              <Plus size={16} />
              {buttonText}
            </Button>
          </div>
        </form>
      </ContentLayout>
    </>
  );
}
