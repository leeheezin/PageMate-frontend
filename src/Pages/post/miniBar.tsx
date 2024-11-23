import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import "./miniBar.style.css";

interface MiniBarProps {
  miniBarPosition: { top: number; left: number; visible: boolean };
  aiRequestText: string;
  setAiRequestText: (text: string) => void;
  handleMiniBarAction: (action: string, type?: string, text?: string) => void;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (open: boolean) => void;
  gptResultModal: boolean;
  gptResultText: string;
  applyGptResult: () => void;
  closeGptResultModal: () => void;
  isLoading: boolean;
}

const MiniBar: React.FC<MiniBarProps> = ({
  miniBarPosition,
  aiRequestText,
  setAiRequestText,
  handleMiniBarAction,
  isDropdownOpen,
  setIsDropdownOpen,
  gptResultModal,
  gptResultText,
  applyGptResult,
  closeGptResultModal,
  isLoading,
}) => {
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

    const handleInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && aiRequestText.trim()) {
      handleMiniBarAction('AI 요청', undefined, aiRequestText.trim());
      setAiRequestText('');
    }
  };

  return (
    <>
      {miniBarPosition.visible && (
        <>
          <div className="mini-bar-input-row"
            style={{
              top: `${miniBarPosition.top}px`,
              left: `${miniBarPosition.left}px`,
            }}
          >
            {/* Input Section */}
            <input
              type="text"
              className="minibar-input"
              placeholder="AI에게 무엇이든 요청하기"
              value={aiRequestText}
              onChange={(e) => setAiRequestText(e.target.value)}
              onKeyPress={handleInputKeyPress}
              />
          </div>
          <div
            className="mini-bar"
            style={{
              top: `${miniBarPosition.top + 40}px`,
              left: `${miniBarPosition.left}px`,
            }}
          >
            {/* Context Menu */}
            <div className="context-menu">
              {/* Recommendation Section */}
              <div className="context-section">
                <div className="section-title">추천</div>
                <button className="ai-button mb-five" onClick={() => handleMiniBarAction('내용 첨삭')}>내용첨삭</button>
                <button className="ai-button" onClick={() => handleMiniBarAction('맞춤법 교정')}>맞춤법 교정</button>
              </div>
              <hr className="gpt-modal-line" />
              {/* Style Change Section */}
              <div className="context-section">
                <div className="section-title">문체변경</div>
                <button className="ai-button mb-five" onClick={() => handleMiniBarAction('문체 변경', '구어체')}>구어체</button>
                <button className="ai-button mb-five" onClick={() => handleMiniBarAction('문체 변경', '문어체')}>문어체</button>
                <button className="ai-button" onClick={() => handleMiniBarAction('문체 변경', '격식체')}>격식체</button>
              </div>
            </div>

            {/* <div className="mini-bar-action-row">
              <button className="mini-bar-btn" onClick={toggleDropdown}>
                문체 변경
                <FontAwesomeIcon icon={faChevronDown} />
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
            </div> */}

            {/* {isDropdownOpen && (
              <div className="mini-bar-dropdown">
                <button
                  className="mini-bar-dropdown-btn"
                  onClick={() => handleMiniBarAction("문체 변경", "구어체")}
                >
                  구어체
                </button>
                <button
                  className="mini-bar-dropdown-btn"
                  onClick={() => handleMiniBarAction("문체 변경", "문어체")}
                >
                  문어체
                </button>
                <button
                  className="mini-bar-dropdown-btn"
                  onClick={() => handleMiniBarAction("문체 변경", "격식체")}
                >
                  격식체
                </button>
              </div>
            )} */}
          </div>
        </>
      )}

      {gptResultModal && (
        <div 
          className="gpt-modal"
          style={{
            top: `${miniBarPosition.top}px`,
            left: `${miniBarPosition.left}px`,
          }}
        >
          {isLoading ? (
            <div className="gpt-loading">로딩 중...</div>
          ) : (
            <>
              <textarea
                className="gpt-modal-textarea"
                value={gptResultText}
                readOnly
              />
              <div className="gpt-modal-buttons">
                <button className="ai-submit-btn cancle" onClick={closeGptResultModal}>
                  취소
                </button>
                <button className="ai-submit-btn" onClick={applyGptResult}>
                  적용
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MiniBar;
