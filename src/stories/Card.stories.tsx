import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card, CardHeader, CardContent } from "@/components/ui";

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    hover: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <h3 className="font-semibold text-zinc-900">Título do Card</h3>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-zinc-600">Conteúdo do card.</p>
      </CardContent>
    </Card>
  ),
};

export const Hoverable: Story = {
  render: () => (
    <Card hover>
      <div className="aspect-[4/3] bg-zinc-100" />
      <CardContent>
        <p className="text-xs text-zinc-400">2024</p>
        <h3 className="font-semibold text-zinc-900">Obra Exemplo</h3>
      </CardContent>
    </Card>
  ),
};

export const Bordered: Story = {
  render: () => (
    <Card>
      <CardContent>
        <p className="text-sm text-zinc-600">Card com borda padrão.</p>
      </CardContent>
    </Card>
  ),
};
