import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "@/components/ui";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "amber", "green", "red", "yellow"],
    },
    size: {
      control: "select",
      options: ["sm", "md"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  args: {
    variant: "default",
    children: "Rascunho",
  },
};

export const Amber: Story = {
  args: {
    variant: "amber",
    children: "Destaque",
  },
};

export const Green: Story = {
  args: {
    variant: "green",
    children: "Publicado",
  },
};

export const Red: Story = {
  args: {
    variant: "red",
    children: "Erro",
  },
};

export const Medium: Story = {
  args: {
    size: "md",
    variant: "amber",
    children: "Tag medium",
  },
};
