interface ClampProps {
  value: number;
  min: number;
  max: number;
}

export const clamp = (props: ClampProps) => {
  const { value, min, max } = props;

  return Math.min(Math.max(value, min), max)
}
