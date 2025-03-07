
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import type { FormInputs } from "@/types/rainfall";

const WeatherInputFields = () => {
  const { register } = useFormContext<FormInputs>();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="minTemp">Minimum Temperature (°C)</Label>
        <Input
          id="minTemp"
          type="number"
          step="0.1"
          {...register("minTemp", { required: true, valueAsNumber: true })}
          className="input-transition"
        />
      </div>
      
      <div>
        <Label htmlFor="maxTemp">Maximum Temperature (°C)</Label>
        <Input
          id="maxTemp"
          type="number"
          step="0.1"
          {...register("maxTemp", { required: true, valueAsNumber: true })}
          className="input-transition"
        />
      </div>
      
      <div>
        <Label htmlFor="rainfall">Rainfall (mm)</Label>
        <Input
          id="rainfall"
          type="number"
          step="0.1"
          {...register("rainfall", { required: true, valueAsNumber: true })}
          className="input-transition"
        />
      </div>
      
      <div>
        <Label htmlFor="evaporation">Evaporation (mm)</Label>
        <Input
          id="evaporation"
          type="number"
          step="0.1"
          {...register("evaporation", { required: true, valueAsNumber: true })}
          className="input-transition"
        />
      </div>
      
      <div>
        <Label htmlFor="sunshine">Sunshine (hours)</Label>
        <Input
          id="sunshine"
          type="number"
          step="0.1"
          {...register("sunshine", { required: true, valueAsNumber: true })}
          className="input-transition"
        />
      </div>
      
      <div>
        <Label htmlFor="windSpeed9am">Wind Speed 9am (km/h)</Label>
        <Input
          id="windSpeed9am"
          type="number"
          step="0.1"
          {...register("windSpeed9am", { required: true, valueAsNumber: true })}
          className="input-transition"
        />
      </div>
      
      <div>
        <Label htmlFor="windSpeed3pm">Wind Speed 3pm (km/h)</Label>
        <Input
          id="windSpeed3pm"
          type="number"
          step="0.1"
          {...register("windSpeed3pm", { required: true, valueAsNumber: true })}
          className="input-transition"
        />
      </div>
      
      <div>
        <Label htmlFor="humidity9am">Humidity 9am (%)</Label>
        <Input
          id="humidity9am"
          type="number"
          {...register("humidity9am", { required: true, valueAsNumber: true })}
          className="input-transition"
        />
      </div>
      
      <div>
        <Label htmlFor="humidity3pm">Humidity 3pm (%)</Label>
        <Input
          id="humidity3pm"
          type="number"
          {...register("humidity3pm", { required: true, valueAsNumber: true })}
          className="input-transition"
        />
      </div>
      
      <div>
        <Label htmlFor="pressure9am">Pressure 9am (hPa)</Label>
        <Input
          id="pressure9am"
          type="number"
          step="0.1"
          {...register("pressure9am", { required: true, valueAsNumber: true })}
          className="input-transition"
        />
      </div>
      
      <div>
        <Label htmlFor="pressure3pm">Pressure 3pm (hPa)</Label>
        <Input
          id="pressure3pm"
          type="number"
          step="0.1"
          {...register("pressure3pm", { required: true, valueAsNumber: true })}
          className="input-transition"
        />
      </div>
      
      <div>
        <Label htmlFor="cloud9am">Cloud Cover 9am (oktas)</Label>
        <Input
          id="cloud9am"
          type="number"
          min="0"
          max="8"
          {...register("cloud9am", { required: true, valueAsNumber: true })}
          className="input-transition"
        />
      </div>
      
      <div>
        <Label htmlFor="cloud3pm">Cloud Cover 3pm (oktas)</Label>
        <Input
          id="cloud3pm"
          type="number"
          min="0"
          max="8"
          {...register("cloud3pm", { required: true, valueAsNumber: true })}
          className="input-transition"
        />
      </div>
      
      <div>
        <Label htmlFor="temp9am">Temperature 9am (°C)</Label>
        <Input
          id="temp9am"
          type="number"
          step="0.1"
          {...register("temp9am", { required: true, valueAsNumber: true })}
          className="input-transition"
        />
      </div>
      
      <div>
        <Label htmlFor="temp3pm">Temperature 3pm (°C)</Label>
        <Input
          id="temp3pm"
          type="number"
          step="0.1"
          {...register("temp3pm", { required: true, valueAsNumber: true })}
          className="input-transition"
        />
      </div>
    </div>
  );
};

export default WeatherInputFields;
