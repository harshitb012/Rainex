
import { Card } from "@/components/ui/card";
import { models } from "@/constants/models";

interface ModelMetricsProps {
  selectedModel: string;
}

const ModelMetrics = ({ selectedModel }: ModelMetricsProps) => {
  const metrics = models[selectedModel];

  if (!metrics) return null;

  return (
    <Card className="p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Model Performance Metrics</h2>
      <div className="metrics-grid">
        <div className="metric-card">
          <p className="text-sm text-gray-600">Accuracy</p>
          <p className="text-2xl font-mono font-semibold">
            {(metrics.accuracy * 100).toFixed(1)}%
          </p>
        </div>
        <div className="metric-card">
          <p className="text-sm text-gray-600">Precision</p>
          <p className="text-2xl font-mono font-semibold">
            {(metrics.precision * 100).toFixed(1)}%
          </p>
        </div>
        <div className="metric-card">
          <p className="text-sm text-gray-600">Recall</p>
          <p className="text-2xl font-mono font-semibold">
            {(metrics.recall * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ModelMetrics;
