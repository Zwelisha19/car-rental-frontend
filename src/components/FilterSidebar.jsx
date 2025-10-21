import { Slider } from "./ui/slider";

const carTypes = [
  { id: "sedan", label: "Sedan" },
  { id: "suv", label: "SUV" },
  { id: "sports", label: "Sports" },
  { id: "compact", label: "Compact" },
  { id: "electric", label: "Electric" },
  { id: "convertible", label: "Convertible" },
];

const transmissionTypes = [
  { id: "all", label: "All Transmissions" },
  { id: "automatic", label: "Automatic" },
  { id: "manual", label: "Manual" },
];

export function FilterSidebar({
  priceRange,
  setPriceRange,
  selectedTypes,
  setSelectedTypes,
  transmission,
  setTransmission,
}) {
  const toggleCarType = (typeId) => {
    if (selectedTypes.includes(typeId)) {
      setSelectedTypes(selectedTypes.filter((id) => id !== typeId));
    } else {
      setSelectedTypes([...selectedTypes, typeId]);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Filters</h3>

      {/* Price Range */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Price Range: ${priceRange[0]} - ${priceRange[1]}
        </label>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={500}
          step={10}
          className="mb-2"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>$0</span>
          <span>$500</span>
        </div>
      </div>

      {/* Car Types */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Car Type
        </label>
        <div className="space-y-3">
          {carTypes.map((type) => (
            <label key={type.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedTypes.includes(type.id)}
                onChange={() => toggleCarType(type.id)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-600">{type.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Transmission */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">
          Transmission
        </label>
        <div className="space-y-3">
          {transmissionTypes.map((type) => (
            <label key={type.id} className="flex items-center">
              <input
                type="radio"
                name="transmission"
                checked={transmission === type.id}
                onChange={() => setTransmission(type.id)}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-3 text-sm text-gray-600">{type.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}