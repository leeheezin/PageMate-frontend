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

  return (
    <>
      {miniBarPosition.visible && (
        <div
          className="mini-bar"
          style={{
            top: `${miniBarPosition.top}px`,
            left: `${miniBarPosition.left}px`,
          }}
        >
          <div className="mini-bar-input-row">
            <input
              type="text"
              className="mini-bar-input"
              placeholder="AI에게 요청 내용"
              value={aiRequestText}
              onChange={(e) => setAiRequestText(e.target.value)}
            />
            <button
              className="mini-bar-btn-request"
              onClick={() =>
                handleMiniBarAction("AI 요청", undefined, aiRequestText)
              }
            >
              요청하기
            </button>
          </div>

          <div className="mini-bar-action-row">
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
          </div>

          {isDropdownOpen && (
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
          )}
        </div>
      )}

      {gptResultModal && (
        <div className="gpt-modal">
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
                <button
                  className="gpt-apply-btn"
                  onClick={applyGptResult}
                >
                  적용하기
                </button>
                <button
                  className="gpt-cancel-btn"
                  onClick={closeGptResultModal}
                >
                  취소
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
