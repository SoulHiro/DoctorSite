import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

export const ToggleOptions = ({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) => {
  return (
    <ToggleGroup
      className="inline-flex items-center justify-center rounded-lg bg-gray-50 p-1 text-sm font-medium shadow-sm ring-1 ring-gray-200"
      type="single"
      defaultValue="published"
      value={value}
      onValueChange={onChange}
    >
      <ToggleGroupItem
        className="ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center rounded-md text-sm whitespace-nowrap transition-all hover:bg-gray-50 hover:text-gray-800 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-gray-100 data-[state=on]:text-gray-900 data-[state=on]:shadow-sm"
        value="draft"
      >
        <span>📝</span>
        Rascunho
      </ToggleGroupItem>
      <ToggleGroupItem
        className="ring-offset-background focus-visible:ring-ring inline-flex items-center justify-center rounded-md text-sm whitespace-nowrap transition-all hover:bg-green-50 hover:text-green-800 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-green-100 data-[state=on]:text-green-900 data-[state=on]:shadow-sm"
        value="published"
      >
        <span>🚀</span>
        Publicar
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

export default ToggleOptions
