import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const LineChartSkeleton = () => {
    const heights = ["18vh", "28vh", "38vh", "20vh", "48vh"];

    return (
        <div className="line-chart-skeleton">
        <SkeletonTheme baseColor="#f3f3f3" highlightColor="#ecebeb">
        {/* <SkeletonTheme baseColor="#ababab" highlightColor="#fafafa"> */}

            {
                heights.map((val, index) => {
                    return <Skeleton width="4vw" height={val} />
                })
            }
        </SkeletonTheme>
        </div>
    );
}

export default LineChartSkeleton;