"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  getPropertyById,
  updateProperty,
} from "@/services/propertyApi";

export default function UpdatePropertyPage() {
  const params = useParams();
  const router = useRouter();

  const [loading, setLoading] =
    useState(true);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm();

  useEffect(() => {
    const loadProperty =
      async () => {
        try {
          const result =
            await getPropertyById(
              params.id
            );

          reset({
            title:
              result?.title,
            location:
              result?.location,
            propertyType:
              result?.propertyType,
            rent:
              result?.rent,
            bedrooms:
              result?.bedrooms,
            bathrooms:
              result?.bathrooms,
            description:
              result?.description,
          });
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    if (params?.id) {
      loadProperty();
    }
  }, [params, reset]);

  const onSubmit = async (
    data
  ) => {
    try {
      const propertyData = {
        title: data.title,
        location:
          data.location,
        propertyType:
          data.propertyType,

        rent: Number(
          data.rent
        ),

        bedrooms: Number(
          data.bedrooms
        ),

        bathrooms: Number(
          data.bathrooms
        ),

        description:
          data.description,
      };

      const result =
        await updateProperty(
          params.id,
          propertyData
        );

      if (
        result.modifiedCount >
        0
      ) {
        alert(
          "Property Updated Successfully"
        );

        router.push(
          "/dashboard/owner/my-properties"
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        Update Property
      </h1>

      <div className="bg-white dark:bg-slate-900 border rounded-2xl p-8">
        <form
          onSubmit={handleSubmit(
            onSubmit
          )}
          className="grid md:grid-cols-2 gap-5"
        >
          <div>
            <label>
              Property Title
            </label>

            <input
              {...register(
                "title"
              )}
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div>
            <label>
              Location
            </label>

            <input
              {...register(
                "location"
              )}
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div>
            <label>
              Property Type
            </label>

            <select
              {...register(
                "propertyType"
              )}
              className="w-full border rounded-xl p-3 mt-2"
            >
              <option>
                Apartment
              </option>

              <option>
                House
              </option>

              <option>
                Villa
              </option>
            </select>
          </div>

          <div>
            <label>
              Rent
            </label>

            <input
              {...register(
                "rent"
              )}
              type="number"
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div>
            <label>
              Bedrooms
            </label>

            <input
              {...register(
                "bedrooms"
              )}
              type="number"
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div>
            <label>
              Bathrooms
            </label>

            <input
              {...register(
                "bathrooms"
              )}
              type="number"
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div className="md:col-span-2">
            <label>
              Description
            </label>

            <textarea
              {...register(
                "description"
              )}
              rows="5"
              className="w-full border rounded-xl p-3 mt-2"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Update Property
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}