import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "outline", "amber", "danger", "ghost"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "icon"],
    },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Salvar",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Cancelar",
  },
};

export const Amber: Story = {
  args: {
    variant: "amber",
    children: "Destaque",
  },
};

export const Danger: Story = {
  args: {
    variant: "danger",
    children: "Excluir",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Voltar",
  },
};

export const Small: Story = {
  args: {
    size: "sm",
    children: "Pequeno",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Desabilitado",
  },
};

export const WithIcon: Story = {
  args: {
    children: "Nova Obra",
  },
};
