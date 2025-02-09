interface LerpProps {
  start: number;
  end: number;
  time: number;
}

export const lerp = (props: LerpProps) => {
  const { start, end, time } = props;

  return start + (end - start) * time
}