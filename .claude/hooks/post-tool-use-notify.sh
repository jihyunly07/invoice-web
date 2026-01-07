#!/bin/bash

# PostToolUse Hook - 도구 실행 후 Slack 알림
# 도구 실행 결과 (성공/실패)를 Slack으로 전송합니다

set -e

# stdin에서 JSON 데이터 읽기
input=$(cat)

# jq로 JSON 파싱
tool_name=$(echo "$input" | jq -r '.tool_name // "알 수 없음"')
success=$(echo "$input" | jq -r '.success // false')
error_message=$(echo "$input" | jq -r '.error // ""')

# 성공/실패에 따른 아이콘 및 상태
if [ "$success" = "true" ]; then
  status_icon="✅"
  status_text="성공"
  color="good"
else
  status_icon="❌"
  status_text="실패"
  color="danger"
fi

# tool_input 추출 (도구에 따라 다름)
if [ "$tool_name" = "Bash" ]; then
  tool_input=$(echo "$input" | jq -r '.tool_input.command // "명령어 없음"')
  detail="명령어: \`${tool_input}\`"
elif [[ "$tool_name" =~ ^(Write|Edit)$ ]]; then
  file_path=$(echo "$input" | jq -r '.tool_input.file_path // "파일 없음"')
  # 파일 크기 확인 (있는 경우)
  if [ -f "$file_path" ]; then
    file_size=$(ls -lh "$file_path" | awk '{print $5}')
    detail="파일: \`${file_path}\`\n크기: ${file_size}"
  else
    detail="파일: \`${file_path}\`"
  fi
else
  detail="도구 입력: $(echo "$input" | jq -c '.tool_input // {}')"
fi

# 에러 메시지 추가
if [ -n "$error_message" ] && [ "$error_message" != "null" ]; then
  error_detail="\n*에러:* ${error_message}"
else
  error_detail=""
fi

# 프로젝트 경로
project_dir="${CLAUDE_PROJECT_DIR:-$(pwd)}"
project_name=$(basename "$project_dir")

# 타임스탬프
timestamp=$(date '+%Y-%m-%d %H:%M:%S')

# Slack 메시지 구성
title="${status_icon} 도구 실행 ${status_text}"
slack_message="*도구:* ${tool_name}\n*상태:* ${status_text}\n${detail}${error_detail}\n*프로젝트:* ${project_name}\n*시간:* ${timestamp}"

# Slack 알림 전송
source "${CLAUDE_PROJECT_DIR:-.}/.claude/hooks/slack-notifier.sh"
send_slack_message "$title" "$slack_message"
