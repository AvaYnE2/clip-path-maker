import React, { useId } from "react";
import { Label } from "@/components/ui/label.tsx";
import { Input } from "@/components/ui/input.tsx";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}
const InputWithLabel: React.FC<Props> = ({ label, ...props }) => {
  const id = useId();
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input {...props} id={id} />
    </div>
  );
};

export default InputWithLabel;
