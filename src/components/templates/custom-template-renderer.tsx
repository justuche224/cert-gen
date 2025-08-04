import React from "react";
import {
  CertificateData,
  CustomTemplateData,
  TemplateElement,
} from "@/lib/types";

interface CustomTemplateRendererProps extends CertificateData {
  templateData: CustomTemplateData;
}

export function CustomTemplateRenderer({
  templateData,
  ...certificateData
}: CustomTemplateRendererProps) {
  const renderElement = (element: TemplateElement) => {
    const { style, content, binding, type } = element;

    let displayContent = content;
    if (binding && certificateData[binding]) {
      displayContent = String(certificateData[binding]);
    }

    const elementStyle: React.CSSProperties = {
      position: "absolute",
      left: `${style.position.x}px`,
      top: `${style.position.y}px`,
      width: `${style.size.width}px`,
      height: `${style.size.height}px`,
      color: style.color,
      backgroundColor: style.backgroundColor,
      fontSize: style.fontSize ? `${style.fontSize}px` : undefined,
      fontWeight: style.fontWeight,
      fontFamily: style.fontFamily,
      textAlign: style.textAlign,
      borderRadius: style.borderRadius ? `${style.borderRadius}px` : undefined,
      border: style.border,
      opacity: style.opacity,
      zIndex: style.zIndex || 1,
      display: "flex",
      alignItems: "center",
      justifyContent:
        style.textAlign === "center"
          ? "center"
          : style.textAlign === "right"
          ? "flex-end"
          : "flex-start",
      wordWrap: "break-word",
      overflow: "hidden",
    };

    switch (type) {
      case "text":
        return (
          <div key={element.id} style={elementStyle}>
            {displayContent}
          </div>
        );

      case "shape":
        const shapeStyle = {
          ...elementStyle,
          backgroundColor: style.backgroundColor || "#000000",
          border: style.border,
          borderRadius: style.borderRadius
            ? `${style.borderRadius}px`
            : undefined,
        };

        switch (element.shapeType) {
          case "circle":
            return (
              <div
                key={element.id}
                style={{
                  ...shapeStyle,
                  borderRadius: "50%",
                }}
              />
            );

          case "triangle":
            return (
              <div
                key={element.id}
                style={{
                  ...elementStyle,
                  backgroundColor: "transparent",
                  width: 0,
                  height: 0,
                  borderLeft: `${style.size.width / 2}px solid transparent`,
                  borderRight: `${style.size.width / 2}px solid transparent`,
                  borderBottom: `${style.size.height}px solid ${
                    style.backgroundColor || "#000000"
                  }`,
                }}
              />
            );

          case "diamond":
            return (
              <div
                key={element.id}
                style={{
                  ...shapeStyle,
                  transform: "rotate(45deg)",
                }}
              />
            );

          case "star":
            return (
              <div
                key={element.id}
                style={{
                  ...elementStyle,
                  backgroundColor: "transparent",
                  fontSize: `${Math.min(
                    style.size.width,
                    style.size.height
                  )}px`,
                  color: style.backgroundColor || "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ★
              </div>
            );

          case "hexagon":
            return (
              <div
                key={element.id}
                style={{
                  ...elementStyle,
                  backgroundColor: "transparent",
                  fontSize: `${Math.min(
                    style.size.width,
                    style.size.height
                  )}px`,
                  color: style.backgroundColor || "#000000",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                ⬢
              </div>
            );

          default: // rectangle
            return <div key={element.id} style={shapeStyle} />;
        }

      case "divider":
        return (
          <div
            key={element.id}
            style={{
              ...elementStyle,
              backgroundColor: style.backgroundColor || "#000000",
              height: "2px",
            }}
          />
        );

      case "image":
        if (displayContent && displayContent.startsWith("http")) {
          return (
            <img
              key={element.id}
              src={displayContent}
              alt="Template element"
              style={{
                ...elementStyle,
                objectFit: "contain",
              }}
            />
          );
        }
        return null;

      default:
        return null;
    }
  };

  return (
    <div
      className="w-full h-full relative"
      style={{
        backgroundColor: templateData.backgroundColor,
        width: `${templateData.dimensions.width}px`,
        height: `${templateData.dimensions.height}px`,
      }}
    >
      {templateData.elements
        .sort((a, b) => (a.style.zIndex || 1) - (b.style.zIndex || 1))
        .map(renderElement)}
    </div>
  );
}
