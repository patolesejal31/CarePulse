"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import { SelectItem } from "@/components/ui/select";
import "react-datepicker/dist/react-datepicker.css";
import CustomFormField, { FormFieldType } from "../ui/CustomFormField";
import SubmitButton from "../ui/SubmitButton";
import { Form } from "../ui/form";
import { Doctors, SampleCollectionMethods, SpecificTests, TestCategories } from "@/constants";
import { useEffect, useState } from "react";
import { createLabTest } from "@/lib/actions/labtest.actions";
import { useRouter } from "next/navigation";

const fastingTests = [
  { name: "Blood Glucose", fastingHours: 8 },
  { name: "Lipid Panel", fastingHours: 10 },
  { name: "Thyroid Function Tests (T3, T4, TSH)", fastingHours: 12 },
  {name: "Ultrasound",fastingHours:7},
];
const testFormSchema = z.object({
  primaryPhysician:z.string().nonempty("Please select a doctor."),
  testCategory: z.string().nonempty("Please select a test category."),
  specificTests: z.string().nonempty("Please select a specific test."),
  sampleCollectionMethod: z.string().nonempty("Please select a sample collection method."),
  sampleCollectionDateTime: z.date().refine(Boolean, "Please select a date and time."),
  fastingRequired: z.boolean().optional(),
  fastingHours: z
    .number()
    .nullable()
    .optional(),
  
  comments: z.string().optional(),
});


const TestForm =  ({ userId,patientId,type }: 
  {userId:string; 
    patientId: string;
    type:"create"|"cancel"|"schedule";
    
  })  => {
  
  const form = useForm<z.infer<typeof testFormSchema>>({
    resolver: zodResolver(testFormSchema),
    defaultValues: {
      primaryPhysician:"",
      testCategory: "",
      specificTests: "",
      sampleCollectionMethod: "",
      sampleCollectionDateTime:new Date(),
      fastingRequired: false,
      fastingHours: null,
      comments: "",
    },
  });

  // Watch the selected specific test
  const specificTest = useWatch({
    control: form.control,
    name: "specificTests",
  });

  // Update fasting information dynamically based on selected test
  const selectedFastingTest = fastingTests.find((test) => test.name === specificTest);

  const fastingMessage = selectedFastingTest
    ? `The selected test "${selectedFastingTest.name}" requires fasting for ${selectedFastingTest.fastingHours} hours.`
    : null;

  if (selectedFastingTest) {
    form.setValue("fastingRequired", true);
    form.setValue("fastingHours", selectedFastingTest.fastingHours);
  } else {
    form.setValue("fastingRequired", false);
    form.setValue("fastingHours", null);
  }

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  
  const onSubmit = async (data: z.infer<typeof testFormSchema>) => {
    setIsLoading(true); // Set loading state to true

    let status;
    switch (type) {
      case "schedule":
        status = "scheduled";
        break;
      case "cancel":
        status = "cancelled";
        break;
      default:
        status = "pending";
    }
  
    try {
      if (type === "create" && patientId) {
      
      const labTestData = {
        userId: userId,
        patient:patientId, // Assuming patientId corresponds to userId
        primaryPhysician: data.primaryPhysician,
        testCategory: data.testCategory,
        specifiedTest: data.specificTests, // Use singular field name as per schema
        sampleCollectionMethod: data.sampleCollectionMethod,
        sampleCollectionDate: new Date(data.sampleCollectionDateTime), // Convert date to ISO string
        comment: data.comments || '', // Optional field
      }
      const newLabTest = await createLabTest(labTestData);
      if (newLabTest) {
        form.reset();
        router.push(`/patients/${userId}/LabTestRequest/success?LabId=${newLabTest.$id}`);
        
      }
    
    }
      
      
  
      
    } catch (error) {
      console.error("Error submitting test form:", error);
      alert("There was an error submitting your request. Please try again.");
    } finally {
      setIsLoading(false); // Set loading state to false when done
    }
  };
  
  
  
  let buttonLabel;
  switch (type) {
    case "cancel":
      buttonLabel = "Cancel Lab Test";
      break;
    case "create":
      buttonLabel = "Create Lab Test";
      break;
    case "schedule":
      buttonLabel = "Schedule Lab Test";
      break;
    default:
      buttonLabel = "Submit Lab Test";
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header text-white"> Lab Test  Request</h1>
          <p className="text-dark-700">Fill out the form to request a lab test.</p>
        </section>

        {type !== "cancel" &&(
          <>
          <CustomFormField
              fieldType={FormFieldType.SELECT}
              control={form.control}
              name="primaryPhysician"
              label="Doctor"
              placeholder="Select a doctor"
            >
              {Doctors.map((doctor, i) => (
                <SelectItem key={doctor.name + i} value={doctor.name}>
                  <div className="flex cursor-pointer items-center gap-2">
                    <Image
                      src={doctor.image}
                      width={32}
                      height={32}
                      alt="doctor"
                      className="rounded-full border border-dark-500"
                    />
                    <p>{doctor.name}</p>
                  </div>
                </SelectItem>
              ))}
            </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="testCategory"
          label="Test Category"
          placeholder="Select a category"
        >
          {TestCategories.map((category, i) => (
            <SelectItem key={category.name + i} value={category.name}>
              {category.name}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="specificTests"
          label="Specific Tests"
          placeholder="Select specific tests"
        >
          {SpecificTests.map((test, i) => (
            <SelectItem key={test.name + i} value={test.name}>
              {test.name}
            </SelectItem>
          ))}
        </CustomFormField>

        {/* Fasting Message Section */}
        {fastingMessage && (
          <div className="text-yellow-600">
            {fastingMessage}
          </div>
        )}

        <CustomFormField
          fieldType={FormFieldType.SELECT}
          control={form.control}
          name="sampleCollectionMethod"
          label="Sample Collection Method"
        >
          {SampleCollectionMethods.map((method, i) => (
            <SelectItem key={method.name + i} value={method.name}>
              {method.name}
            </SelectItem>
          ))}
        </CustomFormField>

        <CustomFormField
          fieldType={FormFieldType.DATE_PICKER}
          control={form.control}
          name="sampleCollectionDateTime"
          label="Sample Collection Date & Time"
          showTimeSelect={true}
          dateFormat="MM/dd/yyyy - h:mm aa"
        />
        <CustomFormField
          fieldType={FormFieldType.TEXTAREA}
          control={form.control}
          name="comments"
          label="Additional Comments or Requests"
          placeholder="Enter any special requirements here"
        />
          </>
        )}
        
        {type === "cancel" && (
          <CustomFormField
            fieldType={FormFieldType.TEXTAREA}
            control={form.control}
            name="cancellationReason"
            label="Reason for cancellation"
            placeholder="Urgent meeting came up"
          />
        )}

        <SubmitButton
          isLoading={isLoading}
          className={`${type === "cancel" ? "shad-danger-btn" : "shad-primary-btn"} w-full`}
        >
          {buttonLabel}
        </SubmitButton>
      </form>
    </Form>
  );
};

export default TestForm;
