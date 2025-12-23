import { Button, Stack } from "@mui/material";
import { useState } from "react";
import type { DateRangeParams, PresetRange } from "../../types/analytics";
import { AppTextField } from "../TextFields/AppTextField";

interface Props {
  value: DateRangeParams;
  onChange: (range: DateRangeParams) => void;
}

export default function DateRangeSelector({ value, onChange }: Props) {
  const [preset, setPreset] = useState<PresetRange>(value.preset ?? "week");

  const applyPreset = (p: PresetRange) => {
    setPreset(p);

    if (p === "week") {
      onChange({ preset: "week" });
    }

    if (p === "month") {
      onChange({ preset: "month" });
    }

    if (p === "custom") {
      onChange({ preset: "custom", from: value.from, to: value.to });
    }
  };

  return (
    <Stack spacing={2}>
      <Stack direction="row" spacing={1}>
        <Button
          size="sm"
          variant={preset === "week" ? "green" : "orange"}
          onClick={() => applyPreset("week")}
        >
          Week
        </Button>

        <Button
          size="sm"
          variant={preset === "month" ? "green" : "orange"}
          onClick={() => applyPreset("month")}
        >
          Month
        </Button>

        <Button
          size="sm"
          variant={preset === "custom" ? "green" : "orange"}
          onClick={() => applyPreset("custom")}
        >
          Custom
        </Button>
      </Stack>

      {preset === "custom" && (
        <Stack direction="row" spacing={2}>
          <AppTextField
            type="date"
            size="small"
            value={value.from ?? ""}
            onChange={(e) =>
              onChange({ preset: "custom", from: e.target.value, to: value.to })
            }
          />
          <AppTextField
            type="date"
            size="small"
            value={value.to ?? ""}
            onChange={(e) =>
              onChange({
                preset: "custom",
                from: value.from,
                to: e.target.value,
              })
            }
          />
        </Stack>
      )}
    </Stack>
  );
}
