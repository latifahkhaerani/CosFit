export interface MarketplaceHeaderProps {
  title?: string;
  description?: string;
}

export default function MarketplaceHeader({
  title = "Marketplace",
  description = "Browse cosplay costumes from every vendor, compare prices, and find the perfect fit before you rent.",
}: MarketplaceHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="font-serif text-4xl font-bold text-foreground">{title}</h1>
      <p className="mt-3 max-w-2xl text-base text-muted">{description}</p>
    </div>
  );
}
