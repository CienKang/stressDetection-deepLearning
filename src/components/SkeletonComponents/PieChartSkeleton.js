import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const PieChartSkeleton = () => {
    const heights = [0,0,0];

    return (
        <div className="pie-chart-skeleton">
        <SkeletonTheme baseColor="#f3f3f3" highlightColor="#ecebeb">
            {
                heights.map((val, index) => {
                    return <Skeleton circle={true} width="10vw" height="10vw" />
                })
            }
        </SkeletonTheme>
        </div>
    );
}

export default PieChartSkeleton;