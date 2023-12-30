interface LogTimeAndDataOptions {
  label: string;
  startTime: Date;
  data: any;
}

export const logTimeAndData = ({
  label,
  startTime,
  data,
}: LogTimeAndDataOptions): void => {
  const endTime = new Date();
  const elapsedTime = endTime.getTime() - startTime.getTime();
  console.log(`[API_LOG] ${label}`);

  console.log(`[API_LOG] Execution time: ${elapsedTime}ms`);
  console.log("[API_LOG] Data:", data);
};
