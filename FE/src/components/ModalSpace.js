import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import {
    isStarRegistOpenState,
    isStarModifyOpenState,
    isStarDetailOpenState,
    isReportDetailOpenState,
    isChangeInfoOpenState,
    isMyStarListOpenState,
    isFavorListOpenState,
    isFollowListOpenState,
    isFindUserOpenState,
    isTagSearchOpenState,
    isSettingOpenState,
    isReportOpenState,
    isOpinionOpenState,
    isConstellationInfoOpenState,
    isAlarmOpenState,
    isGuideCommentOpenState,
    isSpaceMoveState,
} from "./atom";
import StarRegist from "./star/StarRegist";
import StarDetail from "./star/StarDetail";
import ChangeInfo from "./user/ChangeInfo";
import List from "./reusable/List";
import StarFavorList from "./star/StarFavorList";
import FollowList from "./user/FollowList";
import FindUser from "./user/FindUser";
import StarTagSearch from "./star/StarTagSearch";
import Settings from "./user/Settings";
import Report from "./admin/Report";
import ReportDetail from "./admin/ReportDetail";
import { GuideComment } from "./user/UserSpace";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import swal from "sweetalert";
import { constellationInfo } from "data";
import Alarm from "./user/Alarm";
import { useNavigate } from "react-router-dom";
import { IoPlanetOutline } from "react-icons/io5";

function ModalSpace() {
    return (
        <>
            <StarRegistArea />
            <StarDetailArea />
            <StarModifyArea />
            <ChangeInfoArea />
            <MyStarListArea />
            <FavorListArea />
            <FollowListArea />
            <FindUserArea />
            <TagSearchArea />
            <SettingArea />
            <ReportArea />
            <ReportDetailArea />
            <GuideCommentArea />
            <OpinionArea />
            <ConstellationInfoArea />
            <AlarmArea />
            <SpaceMoveArea />
        </>
    );
}

function StarRegistArea() {
    const isStarRegistOpen = useRecoilValue(isStarRegistOpenState);

    return (
        <>
            {isStarRegistOpen && (
                <StarRegist
                    type={"regist"}
                    location={isStarRegistOpen[0]}
                    writerIndex={isStarRegistOpen[1]}
                />
            )}
        </>
    );
}

function StarModifyArea() {
    // [data, starIndex, location. loginUserIndex]
    const isStarModifyOpen = useRecoilValue(isStarModifyOpenState);

    return (
        <>
            {isStarModifyOpen && (
                <StarRegist
                    type={"modify"}
                    preBoard={isStarModifyOpen[0]}
                    boardIndex={isStarModifyOpen[1]}
                    location={isStarModifyOpen[2]}
                    writerIndex={isStarModifyOpen[3]}
                />
            )}
        </>
    );
}

function StarDetailArea() {
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

function ChangeInfoArea() {
    const isChangeInfoOpen = useRecoilValue(isChangeInfoOpenState);

    return <>{isChangeInfoOpen && <ChangeInfo />}</>;
}

function MyStarListArea() {
    const isMyStarListOpen = useRecoilValue(isMyStarListOpenState);

    return <>{isMyStarListOpen && <List />}</>;
}

function FavorListArea() {
    const isFavorListOpen = useRecoilValue(isFavorListOpenState);

    return <>{isFavorListOpen && <StarFavorList />}</>;
}

function FollowListArea() {
    const isFollowListOpen = useRecoilValue(isFollowListOpenState);

    return <>{isFollowListOpen && <FollowList />}</>;
}

function FindUserArea() {
    const isFindUserOpen = useRecoilValue(isFindUserOpenState);

    return <>{isFindUserOpen && <FindUser />}</>;
}

function TagSearchArea() {
    const isTagSearchOpen = useRecoilValue(isTagSearchOpenState);

    return <>{isTagSearchOpen && <StarTagSearch />}</>;
}

function SettingArea() {
    const isSettingOpen = useRecoilValue(isSettingOpenState);

    return <>{isSettingOpen && <Settings />}</>;
}

function ReportArea() {
    const isReportOpen = useRecoilValue(isReportOpenState);
    return <>{isReportOpen && <Report />}</>;
}

function ReportDetailArea() {
    const isReportDetailOpen = useRecoilValue(isReportDetailOpenState);
    return (
        <>
            {isReportDetailOpen && (
                <ReportDetail
                    boardIndex={isReportDetailOpen[0]}
                    reportContent={isReportDetailOpen[1]}
                />
            )}
        </>
    );
}

function AlarmArea() {
    const isAlarmOpen = useRecoilValue(isAlarmOpenState);
    return <>{isAlarmOpen && <Alarm />}</>;
}

function GuideCommentArea() {
    const isGuideCommentOpen = useRecoilValue(isGuideCommentOpenState);
    return <>{isGuideCommentOpen && <GuideComment />}</>;
}

function OpinionArea() {
    const isOpinionOpen = useRecoilValue(isOpinionOpenState);

    return <>{isOpinionOpen && <OpinionAlert />}</>;
}

function OpinionAlert() {
    const [isOpinionOpen, setIsOpinionOpen] =
        useRecoilState(isOpinionOpenState);

    useEffect(() => {
        function handleClick(e) {
            e.stopPropagation();
            const check = [...e.target.classList].some(
                (it) => it === "outside"
            );
            if (check) {
                if (input.current.value.length > 0) {
                    swal({
                        title: "창을 닫을까요?",
                        text: "작성 중인 내용을 잃을 수 있어요!",
                        icon: "warning",
                        buttons: true,
                        dangerMode: true,
                    }).then((willDelete) => {
                        if (willDelete) {
                            setIsOpinionOpen(false);
                        }
                    });
                } else {
                    setIsOpinionOpen(false);
                }
            }
        }

        window.addEventListener("click", handleClick);

        return () => {
            window.removeEventListener("click", handleClick);
        };
    }, []);
    const input = useRef();
    async function handleSubmit() {
        const data = {
            memberIndex: isOpinionOpen,
            opinionText: input.current.value.trim(),
        };

        await axios
            .post(`${process.env.REACT_APP_API_URL}/opinion/add`, data, {
                headers: {
                    token: sessionStorage.getItem("token"),
                },
            })
            .then((response) => {
                console.log(response);
                swal({
                    title: "의견 전송 완료",
                    text: "소중한 의견 감사드립니다!",
                    icon: "success",
                }).then(() => setIsOpinionOpen(false));
            })
            .catch((error) => console.log(error));
    }
    function handleClose() {
        if (input.current.value.length > 0) {
            swal({
                title: "창을 닫을까요?",
                text: "작성 중인 내용을 잃을 수 있어요!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
            }).then((willDelete) => {
                if (willDelete) {
                    setIsOpinionOpen(false);
                }
            });
        } else {
            setIsOpinionOpen(false);
        }
    }

    return (
        <div className="outside w-full h-full absolute top-0 left-0 flex justify-center items-center z-10 bg-modal-outside">
            <div className="w-auto h-auto p-4 bg-alert-bg rounded-xl text-white-sub shadow-xl font-['Pretendard'] text-center">
                <div>의견 보내기</div>
                <div className="text-lg text-center mb-3">
                    "별일" 서비스는 어떠신가요?
                </div>
                <div className="flex justify-center mb-3">
                    <textarea
                        className="bg-transparent rounded-lg p-2 h-28 w-80 resize-none border border-gray-300"
                        maxLength="80"
                        ref={input}
                    />
                </div>
                <div className="flex justify-center gap-5 px-28">
                    <button
                        className="h-8 px-2"
                        onClick={() => {
                            handleSubmit();
                        }}
                    >
                        보내기
                    </button>
                    <button
                        className="h-8 px-2"
                        onClick={() => {
                            handleClose();
                        }}
                    >
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
}

function ConstellationInfoArea() {
    const isConstellationInfoOpen = useRecoilValue(
        isConstellationInfoOpenState
    );
    const [name, setName] = useState();
    const ref = useRef();

    useEffect(() => {
        if (isConstellationInfoOpen !== false) {
            setName(constellationInfo[isConstellationInfoOpen]);
        }
    }, [isConstellationInfoOpen]);

    return (
        <div className="absolute bottom-10 left-0 w-full h-fit  text-white-sub  flex justify-center items-center animate-fade-in font-['Star'] text-4xl">
            <div
                className={`transition-all  duration-300 ${
                    isConstellationInfoOpen !== false
                        ? "opacity-100"
                        : "opacity-0"
                }`}
                ref={ref}
            >
                {isConstellationInfoOpen !== false ? name + " 자리" : null}
            </div>
        </div>
    );
}

function SpaceMoveArea() {
    const isSpaceMove = useRecoilValue(isSpaceMoveState);

    return (
        <>
            {isSpaceMove && (
                <LoadingSpaceMove
                    memberIndex={isSpaceMove[0]}
                    memberNickname={isSpaceMove[1]}
                />
            )}
        </>
    );
}

function LoadingSpaceMove({ ...props }) {
    const resetIsSpaceMove = useResetRecoilState(isSpaceMoveState);
    const navigate = useNavigate();
    const pointRef = useRef([]);

    const points = [".", ".", "."];

    useEffect(() => {
        navigate(`/space/${props.memberIndex}`, {
            state: { props: props.memberNickname },
        });

        for (let i = 0; i < pointRef.current.length; i++) {
            setTimeout(() => {
                pointRef.current[i].style.opacity = 1;
            }, i * 600);
        }

        setTimeout(resetIsSpaceMove, 2000);
    }, []);

    return (
        <div className="fixed top-0 left-0 animate-fade-in-out opacity-0 bg-gradient-to-b from-black via-loading-bg to-black w-full h-full z-10 flex justify-center items-center p-10">
            <div className="font-['Star'] w-full h-full border border-white-sub  rounded-xl text-white-sub text-5xl flex justify-center items-center text-center">
                <div className="mr-3">
                    <IoPlanetOutline />
                </div>
                <div>
                    우 주 이 동 중
                    {points.map((it, index) => (
                        <span
                            className="opacity-0 ml-1"
                            ref={(element) =>
                                (pointRef.current[index] = element)
                            }
                        >
                            {it}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ModalSpace;
