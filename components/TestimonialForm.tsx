"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";
import Image from "next/image";

export default function TestimonialForm() {
    const [formData, setFormData] = useState({
        name: "",
        rating: 5,
        country: "",
        city: "",
        feedback: "",
        images: [] as File[],
    });

    const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFormData({ ...formData, images: [...formData.images, ...Array.from(e.target.files)] });
        }
    };

    const handleRemoveImage = (index: number) => {
        setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formDataToSend = new FormData();
        formDataToSend.append("name", formData.name);
        formDataToSend.append("rating", formData.rating.toString());
        formDataToSend.append("country", formData.country);
        formDataToSend.append("city", formData.city);
        formDataToSend.append("feedback", formData.feedback);
        formData.images.forEach((image) => {
            formDataToSend.append("images", image);
        });

        const response = await fetch("/api/save-testimonial", {
            method: "POST",
            body: formDataToSend,
        });

        if (response.ok) {
            setAlert({ type: "success", message: "Testimoni Success Posted!" });
            setFormData({ name: "", rating: 5, country: "", city: "", feedback: "", images: [] });
        } else {
            setAlert({ type: "error", message: "Failed to Save Testimoni." });
        }
    };

    return (
        <Card className="max-w-lg mx-auto shadow-lg rounded-lg my-8">
            <CardHeader>
                <CardTitle className="text-center text-lg font-semibold">Send Your Testimoni</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {alert && (
                        <Alert variant={alert.type === "success" ? "default" : "destructive"}>
                            {alert.type === "success" ? (
                                <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                                <XCircle className="h-4 w-4 text-red-500" />
                            )}
                            <AlertTitle>{alert.type === "success" ? "Berhasil!" : "Gagal!"}</AlertTitle>
                            <AlertDescription>{alert.message}</AlertDescription>
                        </Alert>
                    )}

                    <div>
                        <Label className="mb-2">Name</Label>
                        <Input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div>
                        <Label className="mb-2">Rating</Label>
                        <Input type="number" name="rating" min="1" max="5" value={formData.rating} onChange={handleChange} required />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <Label className="mb-2">Country</Label>
                            <Input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label className="mb-2">City</Label>
                            <Input type="text" name="city" placeholder="Kota" value={formData.city} onChange={handleChange} required />
                        </div>
                    </div>

                    <div>
                        <Label className="mb-2">Feedback</Label>
                        <Textarea name="feedback" placeholder="Enter Feedback" value={formData.feedback} onChange={handleChange} required />
                    </div>

                    <div>
                        <Label className="mb-2">Images</Label>
                        <Input type="file" accept="image/*" multiple onChange={handleFileChange} required />
                    </div>

                    {formData.images.length > 0 && (
                        <div className="grid grid-cols-3 gap-2">
                            {formData.images.map((image, index) => (
                                <div key={index} className="relative">
                                    <Image src={URL.createObjectURL(image)} alt="Preview" width={100} height={100} className="rounded-lg object-cover" />
                                    <button type="button" onClick={() => handleRemoveImage(index)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1">
                                        <Trash2 size={14} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    <Button type="submit" className="w-full">Send your Feed</Button>
                </form>
            </CardContent>
        </Card>
    );
}
