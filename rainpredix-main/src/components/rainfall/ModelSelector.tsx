
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MODEL_NAMES } from "@/constants/models";

interface ModelSelectorProps {
  selectedModel: string;
  onModelChange: (value: string) => void;
}

const ModelSelector = ({ selectedModel, onModelChange }: ModelSelectorProps) => {
  return (
    <div>
      <Label>Select Model</Label>
      <Select value={selectedModel} onValueChange={onModelChange}>
        <SelectTrigger className="w-full input-transition">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent>
          {Object.entries(MODEL_NAMES).map(([value, label]) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ModelSelector;
