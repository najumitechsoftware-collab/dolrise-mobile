interface Props {
  requiredFields: string;
  onChange: (field: string, value: string) => void;
}

export default function DynamicFields({
  requiredFields,
  onChange,
}: Props) {
  const fields = requiredFields.split(",");

  return (
    <div className="pm-fields">
      {fields.map((field) => (
        <div key={field} className="pm-field">
          <label>{field.replace("_", " ")}</label>
          <input
            type="text"
            onChange={(e) =>
              onChange(field, e.target.value)
            }
          />
        </div>
      ))}
    </div>
  );
}
