
import { Card } from "@/components/ui/card";
import { models } from "@/constants/models";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ModelComparison = () => {
  const getModelMetricsData = () => {
    return Object.entries(models).map(([model, metrics]) => ({
      model,
      ...metrics
    }));
  };

  return (
    <Card className="p-6 shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Model Comparison</h2>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={getModelMetricsData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="model" />
            <YAxis domain={[0.7, 1]} />
            <Tooltip />
            <Legend />
            <Bar dataKey="accuracy" fill="#3B82F6" name="Accuracy" />
            <Bar dataKey="precision" fill="#10B981" name="Precision" />
            <Bar dataKey="recall" fill="#6366F1" name="Recall" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default ModelComparison;
