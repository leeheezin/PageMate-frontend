import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useSelector } from "react-redux";


const MiniBarComponent = (
    miniBarPosition: { top: number; left: number; visible: boolean }, 
    handleMiniBarAction: (action: string, type?: string, text?: string) => void, 
    aiRequestText: string, 
    setAiRequestText: (text: string) => void,
    applyGptResult: () => void, 
    closeGptResultModal: () => void, 
    gptResultText: string, 
    isLoading: boolean, 
    gptResultModal: boolean, 
    isDropdownOpen: boolean, 
    setIsDropdownOpen: (open: boolean) => void
) => {

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    
    // miniBar 및 miniBarDropdown 호출
    // 미니바 컴포넌트
    const miniBar = () => {
        
        return (
        <div
            className="mini-bar"
            style={{
                top: `${miniBarPosition.top}px`,
                left: `${miniBarPosition.left}px`,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <div className="mini-bar-row">
                <input
                    type="text"
                    className="mini-bar-input"
                    placeholder="AI에게 요청 내용"
                    value={aiRequestText}
                    onChange={(e) => setAiRequestText(e.target.value)}
                />
                <button
                    className="mini-bar-btn"
                    onClick={() => handleMiniBarAction("AI 요청", undefined, aiRequestText)}
                >
                    요청하기
                </button>
            </div>
            <div className="mini-bar-row">
                <button
                    className="mini-bar-btn"
                    onClick={toggleDropdown}
                >
                    문체 변경 <FontAwesomeIcon icon={faChevronDown} />
                </button>
    
                <button
                    className="mini-bar-btn"
                    onClick={() => handleMiniBarAction("내용 첨삭")}
                >
                    내용 첨삭
                </button>
                <button
                    className="mini-bar-btn"
                    onClick={() => handleMiniBarAction("맞춤법 교정")}
                >
                    맞춤법 교정
                </button>
            </div>
        </div>
        )
    }
        
    const miniBarDropdown = () => 
        {
        return (
            isDropdownOpen && (
                <div
                    className="mini-bar"
                    style={{
                        top: `${miniBarPosition.top + 120}px`,
                        left: `${miniBarPosition.left}px`,
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                >
                    <button
                        className="mini-bar-btn2"
                        onClick={() => handleMiniBarAction("문체 변경", "구어체")}
                    >
                        구어체
                    </button>
                    <button
                        className="mini-bar-btn2"
                        onClick={() => handleMiniBarAction("문체 변경", "문어체")}
                    >
                        문어체
                    </button>
                    <button
                        className="mini-bar-btn2"
                        onClick={() => handleMiniBarAction("문체 변경", "격식체")}
                    >
                        격식체
                    </button>
                </div>
            )
        );
    }

    const GptResultModal = () => {

        return (
        <div
          className="gpt-modal"
          style={{
            position: 'absolute',
            top: `${miniBarPosition.top + 60}px`, // miniBarPosition 바로 아래에 위치
            left: `${miniBarPosition.left}px`,
            backgroundColor: 'white',
            padding: '20px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            zIndex: 1000,
          }}
        >
          <div className="gpt-modal-content">
            {isLoading ? (
              <div className="loading-spinner">로딩 중...</div>
            ) : (
              <>
                <textarea
                  className="gpt-modal-textarea" 
                  value={gptResultText}
                  readOnly
                ></textarea>
                <div className="gpt-modal-buttons">
                  <button className="gpt-apply-btn" onClick={applyGptResult}>
                    적용하기
                  </button>
                  <button className="gpt-cancel-btn" onClick={closeGptResultModal}>
                    취소
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      );
    }
    return (
        <>
            {miniBarPosition.visible && miniBar()}
            {miniBarPosition.visible && isDropdownOpen && miniBarDropdown()}
            {gptResultModal && GptResultModal()}
        </>
    );
};


export default MiniBarComponent;