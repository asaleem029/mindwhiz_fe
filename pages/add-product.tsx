import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { api } from "@/utils/api";

const AddProduct = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [availability, setAvailability] = useState<"in_stock" | "out_of_stock">("in_stock");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const { isAdmin, user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Redirect if not admin
        if (user && !isAdmin) {
            router.push("/");
        } else if (!user) {
            router.push("/login");
        }
    }, [user, isAdmin, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!name || !price || !description) {
            setError("Please fill in all required fields");
            setLoading(false);
            return;
        }

        try {
            await api.post("/products", {
                name,
                price: parseFloat(price),
                description,
                image: image || undefined,
                availability,
            });
            alert("Product added successfully!");
            router.push("/");
        } catch (error: any) {
            console.error("Error adding product:", error);
            setError("Failed to add product. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!user || !isAdmin) {
        return <div className="container">Unauthorized</div>;
    }

    return (
        <div className="container">
            <div className="form-container">
                <h1 className="page-title">Add New Product</h1>
                <form onSubmit={handleSubmit} className="add-product-form">
                    <div className="form-group">
                        <label className="form-label">Product Name *</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Product Name"
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Price *</label>
                        <input
                            type="number"
                            step="0.01"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            placeholder="Price"
                            required
                            className="form-input"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description *</label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Description"
                            required
                            rows={4}
                            className="form-textarea"
                        />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Availability *</label>
                        <select
                            value={availability}
                            onChange={(e) => setAvailability(e.target.value as "in_stock" | "out_of_stock")}
                            className="form-select"
                        >
                            <option value="In Stock">In Stock</option>
                            <option value="Out of Stock">Out of Stock</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="form-label">Product Image URL (Optional)</label>
                        <input
                            type="text"
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            placeholder="Image URL"
                            className="form-input"
                        />
                    </div>
                    {error && <div className="error-message">{error}</div>}
                    <div className="form-actions">
                        <button type="submit" className="btn-primary" disabled={loading}>
                            {loading ? "Adding..." : "Add Product"}
                        </button>
                        <button
                            type="button"
                            className="btn-secondary"
                            onClick={() => router.push("/")}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
