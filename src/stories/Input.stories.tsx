import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input } from "@/components/ui";
import { Search } from "lucide-react";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: "Digite algo...",
  },
};

export const WithIcon: Story = {
  args: {
    placeholder: "Buscar...",
    icon: <Search className="h-4 w-4" />,
  },
};

export const Disabled: Story = {
  args: {
    placeholder: "Campo desabilitado",
    disabled: true,
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "Valor preenchido",
  },
};
