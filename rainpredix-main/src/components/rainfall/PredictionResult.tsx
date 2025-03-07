
import { Card } from "@/components/ui/card";

interface PredictionResultProps {
  prediction: string | null;
  selectedModel: string;
}

const PredictionResult = ({ prediction, selectedModel }: PredictionResultProps) => {
  if (!prediction) return null;

  return (
    <Card className="p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Prediction Result</h2>
      <div className="text-center">
        <p className="text-3xl font-bold mb-2">
          Rain Tomorrow: <span className={prediction === 'Yes' ? 'text-blue-600' : 'text-gray-600'}>
            {prediction}
          </span>
        </p>
        <p className="text-gray-600">Predicted using {selectedModel.toUpperCase()} model</p>
      </div>
    </Card>
  );
};

export default PredictionResult;
