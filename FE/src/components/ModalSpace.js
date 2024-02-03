import { useRecoilValue } from "recoil";
import { isStarRegistOpenState, isStarModifyOpenState, isStarDetailOpenState, isDeleteAlertOpenState, isReportAlertOpenState, reportModalState } from "./atom";
import StarRegist from "./star/StarRegist";
import StarDetail from "./star/StarDetail";

function ModalSpace(){
    return(
        <>
            <StarRegistArea/>
            <StarDetailArea/>
            <StarModifyArea/>
        </>
    )
}

function StarRegistArea(){
    const isStarRegistOpen = useRecoilValue(isStarRegistOpenState);
    
    return (
        <>
            {
                isStarRegistOpen ? (
                    <StarRegist type={'regist'} location={isStarRegistOpen} /> 
                ) : null
            }

        </>
    );
}

function StarModifyArea(){
    const isStarModifyOpen = useRecoilValue(isStarModifyOpenState);
    return(
        <>
             {   
                isStarModifyOpen ? (
                    <StarRegist type={'modify'} preBoard={isStarModifyOpen}/>
                ) : null
            }
        </>
    )
}

function StarDetailArea(){
    const isStarDetailOpen = useRecoilValue(isStarDetailOpenState);

    return (
        <>
            {isStarDetailOpen && (
                <StarDetail
                    starIndex={isStarDetailOpen[0]}
                    userIndex={isStarDetailOpen[1]}
                />
            )}
        </>
    );

}


export default ModalSpace;