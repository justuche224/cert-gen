"use client";

import React, { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import {
  Type,
  Square,
  Minus,
  Image,
  Trash2,
  Copy,
  Save,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import {
  TemplateElement,
  CustomTemplateData,
  CertificateData,
} from "@/lib/types";
import { CustomTemplateRenderer } from "./templates/custom-template-renderer";

interface TemplateDesignerProps {
  onSave: (
    templateData: CustomTemplateData,
    name: string,
    description: string
  ) => Promise<void>;
  initialData?: CustomTemplateData;
  certificateData: CertificateData;
}

const defaultDimensions = { width: 1000, height: 707 };
const defaultBackgroundColor = "#ffffff";

export function TemplateDesigner({
  onSave,
  initialData,
  certificateData,
}: TemplateDesignerProps) {
  const [templateData, setTemplateData] = useState<CustomTemplateData>(
    initialData || {
      elements: [],
      dimensions: defaultDimensions,
      backgroundColor: defaultBackgroundColor,
    }
  );

  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [zoom, setZoom] = useState(0.5);
  const [templateName, setTemplateName] = useState("");
  const [templateDescription, setTemplateDescription] = useState("");
  const [history, setHistory] = useState<CustomTemplateData[]>([templateData]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const canvasRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const addToHistory = useCallback(
    (newData: CustomTemplateData) => {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(newData);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    },
    [history, historyIndex]
  );

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setTemplateData(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setTemplateData(history[historyIndex + 1]);
    }
  };

  const createElement = (type: TemplateElement["type"]) => {
    const newElement: TemplateElement = {
      id: crypto.randomUUID(),
      type,
      content: type === "text" ? "Sample Text" : "",
      style: {
        position: { x: 100, y: 100 },
        size: {
          width: type === "divider" ? 200 : 150,
          height: type === "divider" ? 2 : 50,
        },
        color: type === "text" ? "#000000" : undefined,
        backgroundColor: type === "divider" ? "#3b82f6" : undefined,
        fontSize: type === "text" ? 16 : undefined,
        fontFamily: type === "text" ? "Inter" : undefined,
        textAlign: type === "text" ? "left" : undefined,
        zIndex: templateData.elements.length + 1,
      },
    };

    const newData = {
      ...templateData,
      elements: [...templateData.elements, newElement],
    };

    setTemplateData(newData);
    addToHistory(newData);
    setSelectedElementId(newElement.id);
  };

  const createCertificateField = (binding: keyof CertificateData) => {
    const fieldNames = {
      certificateTitle: "Certificate Title",
      recipientName: "Recipient Name",
      courseName: "Course Name",
      issuerName: "Issuer Name",
      date: "Date",
    };

    const fieldSizes = {
      certificateTitle: { width: 400, height: 50, fontSize: 24 },
      recipientName: { width: 300, height: 60, fontSize: 32 },
      courseName: { width: 350, height: 40, fontSize: 20 },
      issuerName: { width: 200, height: 30, fontSize: 16 },
      date: { width: 150, height: 30, fontSize: 16 },
    };

    const newElement: TemplateElement = {
      id: crypto.randomUUID(),
      type: "text",
      content:
        fieldNames[binding as keyof typeof fieldNames] || "Certificate Field",
      binding,
      style: {
        position: { x: 100, y: 100 + templateData.elements.length * 70 },
        size: fieldSizes[binding as keyof typeof fieldSizes] || {
          width: 200,
          height: 40,
        },
        color: "#000000",
        fontSize:
          fieldSizes[binding as keyof typeof fieldSizes]?.fontSize || 16,
        fontFamily: "Inter",
        textAlign: "left",
        zIndex: templateData.elements.length + 1,
      },
    };

    const newData = {
      ...templateData,
      elements: [...templateData.elements, newElement],
    };

    setTemplateData(newData);
    addToHistory(newData);
    setSelectedElementId(newElement.id);
  };

  const createShape = (shapeType: TemplateElement["shapeType"]) => {
    const newElement: TemplateElement = {
      id: crypto.randomUUID(),
      type: "shape",
      content: "",
      shapeType,
      style: {
        position: { x: 100, y: 100 },
        size: { width: 100, height: 100 },
        backgroundColor: "#3b82f6",
        zIndex: templateData.elements.length + 1,
      },
    };

    const newData = {
      ...templateData,
      elements: [...templateData.elements, newElement],
    };

    setTemplateData(newData);
    addToHistory(newData);
    setSelectedElementId(newElement.id);
  };

  const updateElement = (id: string, updates: Partial<TemplateElement>) => {
    const newData = {
      ...templateData,
      elements: templateData.elements.map((el) =>
        el.id === id ? { ...el, ...updates } : el
      ),
    };
    setTemplateData(newData);
  };

  const deleteElement = (id: string) => {
    const newData = {
      ...templateData,
      elements: templateData.elements.filter((el) => el.id !== id),
    };
    setTemplateData(newData);
    addToHistory(newData);
    setSelectedElementId(null);
  };

  const duplicateElement = (id: string) => {
    const element = templateData.elements.find((el) => el.id === id);
    if (element) {
      const newElement = {
        ...element,
        id: crypto.randomUUID(),
        style: {
          ...element.style,
          position: {
            x: element.style.position.x + 20,
            y: element.style.position.y + 20,
          },
          zIndex: templateData.elements.length + 1,
        },
      };

      const newData = {
        ...templateData,
        elements: [...templateData.elements, newElement],
      };

      setTemplateData(newData);
      addToHistory(newData);
      setSelectedElementId(newElement.id);
    }
  };

  const handleElementMouseDown = (e: React.MouseEvent, elementId: string) => {
    e.stopPropagation();
    setSelectedElementId(elementId);
    setIsDragging(true);

    const element = templateData.elements.find((el) => el.id === elementId);
    if (element && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const offsetX = e.clientX - rect.left - element.style.position.x * zoom;
      const offsetY = e.clientY - rect.top - element.style.position.y * zoom;
      setDragOffset({ x: offsetX, y: offsetY });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && selectedElementId && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - dragOffset.x) / zoom;
      const y = (e.clientY - rect.top - dragOffset.y) / zoom;

      const element = templateData.elements.find(
        (el) => el.id === selectedElementId
      );
      if (element) {
        updateElement(selectedElementId, {
          style: {
            ...element.style,
            position: { x: Math.max(0, x), y: Math.max(0, y) },
          },
        });
      }
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      addToHistory(templateData);
      setIsDragging(false);
    }
  };

  const selectedElement = templateData.elements.find(
    (el) => el.id === selectedElementId
  );

  const handleSave = async () => {
    if (!templateName.trim()) {
      toast({
        variant: "destructive",
        title: "Template name required",
        description: "Please enter a name for your template.",
      });
      return;
    }

    try {
      await onSave(templateData, templateName, templateDescription || "");
      toast({
        title: "Template saved",
        description: "Your custom template has been saved successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Save failed",
        description: "Failed to save template. Please try again.",
      });
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="w-80 border-r bg-card">
        <ScrollArea className="h-full">
          <div className="p-4 space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Template Designer</h3>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-sm">
                <p className="text-blue-800 font-medium mb-1">
                  💡 Quick Start:
                </p>
                <p className="text-blue-700">
                  1. Add Certificate Fields for dynamic text
                  <br />
                  2. Use shapes and elements for design
                  <br />
                  3. Elements with green borders are data-bound
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name</Label>
                <Input
                  id="template-name"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                  placeholder="Enter template name"
                />
              </div>
              <div className="space-y-2 mt-4">
                <Label htmlFor="template-description">Description</Label>
                <Input
                  id="template-description"
                  value={templateDescription}
                  onChange={(e) => setTemplateDescription(e.target.value)}
                  placeholder="Enter description"
                />
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-3">Add Elements</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => createElement("text")}
                  className="flex items-center gap-2"
                >
                  <Type className="w-4 h-4" />
                  Text
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => createElement("divider")}
                  className="flex items-center gap-2"
                >
                  <Minus className="w-4 h-4" />
                  Line
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => createElement("image")}
                  className="flex items-center gap-2"
                >
                  <Image className="w-4 h-4" />
                  Image
                </Button>
              </div>

              <h4 className="font-medium mb-3 mt-4">Certificate Fields</h4>
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  createCertificateField("certificateTitle");
                  setTimeout(() => createCertificateField("recipientName"), 50);
                  setTimeout(() => createCertificateField("courseName"), 100);
                  setTimeout(() => createCertificateField("issuerName"), 150);
                  setTimeout(() => createCertificateField("date"), 200);
                }}
                className="w-full mb-3"
              >
                ✨ Add All Certificate Fields
              </Button>
              <div className="grid grid-cols-1 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => createCertificateField("certificateTitle")}
                  className="flex items-center gap-2 justify-start"
                >
                  📜 Certificate Title
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => createCertificateField("recipientName")}
                  className="flex items-center gap-2 justify-start"
                >
                  👤 Recipient Name
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => createCertificateField("courseName")}
                  className="flex items-center gap-2 justify-start"
                >
                  📚 Course Name
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => createCertificateField("issuerName")}
                  className="flex items-center gap-2 justify-start"
                >
                  🏢 Issuer Name
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => createCertificateField("date")}
                  className="flex items-center gap-2 justify-start"
                >
                  📅 Date
                </Button>
              </div>

              <h4 className="font-medium mb-3 mt-4">Shapes</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => createShape("rectangle")}
                  className="flex items-center gap-2"
                >
                  <Square className="w-4 h-4" />
                  Rectangle
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => createShape("circle")}
                  className="flex items-center gap-2"
                >
                  <div className="w-4 h-4 rounded-full border-2 border-current" />
                  Circle
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => createShape("triangle")}
                  className="flex items-center gap-2"
                >
                  <div className="w-0 h-0 border-l-2 border-r-2 border-b-4 border-l-transparent border-r-transparent border-b-current" />
                  Triangle
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => createShape("diamond")}
                  className="flex items-center gap-2"
                >
                  <div className="w-3 h-3 transform rotate-45 border-2 border-current" />
                  Diamond
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => createShape("star")}
                  className="flex items-center gap-2"
                >
                  ⭐ Star
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => createShape("hexagon")}
                  className="flex items-center gap-2"
                >
                  ⬢ Hexagon
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-3">Canvas</h4>
              <div className="space-y-3">
                <div>
                  <Label>Background Color</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      type="color"
                      value={templateData.backgroundColor}
                      onChange={(e) => {
                        const newData = {
                          ...templateData,
                          backgroundColor: e.target.value,
                        };
                        setTemplateData(newData);
                      }}
                      className="w-12 h-8 p-1"
                    />
                    <Input
                      value={templateData.backgroundColor}
                      onChange={(e) => {
                        const newData = {
                          ...templateData,
                          backgroundColor: e.target.value,
                        };
                        setTemplateData(newData);
                      }}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div>
                  <Label>Zoom: {Math.round(zoom * 100)}%</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setZoom(Math.max(0.1, zoom - 0.1))}
                    >
                      <ZoomOut className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setZoom(Math.min(2, zoom + 0.1))}
                    >
                      <ZoomIn className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {selectedElement && (
              <>
                <Separator />
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">Element Properties</h4>
                    <div className="flex gap-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => duplicateElement(selectedElement.id)}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteElement(selectedElement.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <Tabs defaultValue="content" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="content">Content</TabsTrigger>
                      <TabsTrigger value="style">Style</TabsTrigger>
                      <TabsTrigger value="position">Position</TabsTrigger>
                    </TabsList>

                    <TabsContent value="content" className="space-y-3">
                      {selectedElement.type === "text" && (
                        <>
                          <div>
                            <Label>Text Content</Label>
                            <Input
                              value={selectedElement.content}
                              onChange={(e) =>
                                updateElement(selectedElement.id, {
                                  content: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <Label>Data Binding</Label>
                            <Select
                              value={selectedElement.binding || "none"}
                              onValueChange={(value) =>
                                updateElement(selectedElement.id, {
                                  binding:
                                    value === "none"
                                      ? undefined
                                      : (value as keyof CertificateData),
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select field" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="none">None</SelectItem>
                                <SelectItem value="recipientName">
                                  Recipient Name
                                </SelectItem>
                                <SelectItem value="courseName">
                                  Course Name
                                </SelectItem>
                                <SelectItem value="issuerName">
                                  Issuer Name
                                </SelectItem>
                                <SelectItem value="date">Date</SelectItem>
                                <SelectItem value="certificateTitle">
                                  Certificate Title
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}

                      {selectedElement.type === "image" && (
                        <div>
                          <Label>Image URL</Label>
                          <Input
                            value={selectedElement.content}
                            onChange={(e) =>
                              updateElement(selectedElement.id, {
                                content: e.target.value,
                              })
                            }
                            placeholder="https://example.com/image.jpg"
                          />
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="style" className="space-y-3">
                      {selectedElement.type === "text" && (
                        <>
                          <div>
                            <Label>Font Size</Label>
                            <Slider
                              value={[selectedElement.style.fontSize || 16]}
                              onValueChange={([value]) =>
                                updateElement(selectedElement.id, {
                                  style: {
                                    ...selectedElement.style,
                                    fontSize: value,
                                  },
                                })
                              }
                              min={8}
                              max={72}
                              step={1}
                            />
                            <div className="text-sm text-muted-foreground mt-1">
                              {selectedElement.style.fontSize || 16}px
                            </div>
                          </div>

                          <div>
                            <Label>Text Color</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <Input
                                type="color"
                                value={selectedElement.style.color || "#000000"}
                                onChange={(e) =>
                                  updateElement(selectedElement.id, {
                                    style: {
                                      ...selectedElement.style,
                                      color: e.target.value,
                                    },
                                  })
                                }
                                className="w-12 h-8 p-1"
                              />
                              <Input
                                value={selectedElement.style.color || "#000000"}
                                onChange={(e) =>
                                  updateElement(selectedElement.id, {
                                    style: {
                                      ...selectedElement.style,
                                      color: e.target.value,
                                    },
                                  })
                                }
                                className="flex-1"
                              />
                            </div>
                          </div>

                          <div>
                            <Label>Text Align</Label>
                            <Select
                              value={selectedElement.style.textAlign || "left"}
                              onValueChange={(value) =>
                                updateElement(selectedElement.id, {
                                  style: {
                                    ...selectedElement.style,
                                    textAlign: value as
                                      | "left"
                                      | "center"
                                      | "right",
                                  },
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="left">Left</SelectItem>
                                <SelectItem value="center">Center</SelectItem>
                                <SelectItem value="right">Right</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </>
                      )}

                      {selectedElement.type === "shape" && (
                        <>
                          <div>
                            <Label>Shape Type</Label>
                            <Select
                              value={selectedElement.shapeType || "rectangle"}
                              onValueChange={(value) =>
                                updateElement(selectedElement.id, {
                                  shapeType:
                                    value as TemplateElement["shapeType"],
                                })
                              }
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="rectangle">
                                  Rectangle
                                </SelectItem>
                                <SelectItem value="circle">Circle</SelectItem>
                                <SelectItem value="triangle">
                                  Triangle
                                </SelectItem>
                                <SelectItem value="diamond">Diamond</SelectItem>
                                <SelectItem value="star">Star</SelectItem>
                                <SelectItem value="hexagon">Hexagon</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Fill Color</Label>
                            <div className="flex items-center gap-2 mt-1">
                              <Input
                                type="color"
                                value={
                                  selectedElement.style.backgroundColor ||
                                  "#3b82f6"
                                }
                                onChange={(e) =>
                                  updateElement(selectedElement.id, {
                                    style: {
                                      ...selectedElement.style,
                                      backgroundColor: e.target.value,
                                    },
                                  })
                                }
                                className="w-12 h-8 p-1"
                              />
                              <Input
                                value={
                                  selectedElement.style.backgroundColor ||
                                  "#3b82f6"
                                }
                                onChange={(e) =>
                                  updateElement(selectedElement.id, {
                                    style: {
                                      ...selectedElement.style,
                                      backgroundColor: e.target.value,
                                    },
                                  })
                                }
                                className="flex-1"
                              />
                            </div>
                          </div>

                          <div>
                            <Label>Border</Label>
                            <Input
                              value={selectedElement.style.border || ""}
                              onChange={(e) =>
                                updateElement(selectedElement.id, {
                                  style: {
                                    ...selectedElement.style,
                                    border: e.target.value,
                                  },
                                })
                              }
                              placeholder="e.g., 2px solid #000000"
                            />
                          </div>

                          <div>
                            <Label>Border Radius</Label>
                            <Slider
                              value={[selectedElement.style.borderRadius || 0]}
                              onValueChange={([value]) =>
                                updateElement(selectedElement.id, {
                                  style: {
                                    ...selectedElement.style,
                                    borderRadius: value,
                                  },
                                })
                              }
                              min={0}
                              max={50}
                              step={1}
                            />
                            <div className="text-sm text-muted-foreground mt-1">
                              {selectedElement.style.borderRadius || 0}px
                            </div>
                          </div>
                        </>
                      )}

                      {selectedElement.type === "divider" && (
                        <div>
                          <Label>Background Color</Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Input
                              type="color"
                              value={
                                selectedElement.style.backgroundColor ||
                                "#3b82f6"
                              }
                              onChange={(e) =>
                                updateElement(selectedElement.id, {
                                  style: {
                                    ...selectedElement.style,
                                    backgroundColor: e.target.value,
                                  },
                                })
                              }
                              className="w-12 h-8 p-1"
                            />
                            <Input
                              value={
                                selectedElement.style.backgroundColor ||
                                "#3b82f6"
                              }
                              onChange={(e) =>
                                updateElement(selectedElement.id, {
                                  style: {
                                    ...selectedElement.style,
                                    backgroundColor: e.target.value,
                                  },
                                })
                              }
                              className="flex-1"
                            />
                          </div>
                        </div>
                      )}

                      <div>
                        <Label>Width</Label>
                        <Slider
                          value={[selectedElement.style.size.width]}
                          onValueChange={([value]) =>
                            updateElement(selectedElement.id, {
                              style: {
                                ...selectedElement.style,
                                size: {
                                  ...selectedElement.style.size,
                                  width: value,
                                },
                              },
                            })
                          }
                          min={10}
                          max={selectedElement.type === "text" ? 800 : 500}
                          step={1}
                        />
                        <div className="text-sm text-muted-foreground mt-1">
                          {selectedElement.style.size.width}px
                        </div>
                      </div>

                      <div>
                        <Label>Height</Label>
                        <Slider
                          value={[selectedElement.style.size.height]}
                          onValueChange={([value]) =>
                            updateElement(selectedElement.id, {
                              style: {
                                ...selectedElement.style,
                                size: {
                                  ...selectedElement.style.size,
                                  height: value,
                                },
                              },
                            })
                          }
                          min={10}
                          max={selectedElement.type === "text" ? 200 : 500}
                          step={1}
                        />
                        <div className="text-sm text-muted-foreground mt-1">
                          {selectedElement.style.size.height}px
                        </div>
                      </div>

                      <div>
                        <Label>Opacity</Label>
                        <Slider
                          value={[(selectedElement.style.opacity || 1) * 100]}
                          onValueChange={([value]) =>
                            updateElement(selectedElement.id, {
                              style: {
                                ...selectedElement.style,
                                opacity: value / 100,
                              },
                            })
                          }
                          min={0}
                          max={100}
                          step={1}
                        />
                        <div className="text-sm text-muted-foreground mt-1">
                          {Math.round(
                            (selectedElement.style.opacity || 1) * 100
                          )}
                          %
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="position" className="space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label>X Position</Label>
                          <Input
                            type="number"
                            value={selectedElement.style.position.x}
                            onChange={(e) =>
                              updateElement(selectedElement.id, {
                                style: {
                                  ...selectedElement.style,
                                  position: {
                                    ...selectedElement.style.position,
                                    x: parseInt(e.target.value) || 0,
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label>Y Position</Label>
                          <Input
                            type="number"
                            value={selectedElement.style.position.y}
                            onChange={(e) =>
                              updateElement(selectedElement.id, {
                                style: {
                                  ...selectedElement.style,
                                  position: {
                                    ...selectedElement.style.position,
                                    y: parseInt(e.target.value) || 0,
                                  },
                                },
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label>Width</Label>
                          <Input
                            type="number"
                            value={selectedElement.style.size.width}
                            onChange={(e) =>
                              updateElement(selectedElement.id, {
                                style: {
                                  ...selectedElement.style,
                                  size: {
                                    ...selectedElement.style.size,
                                    width: parseInt(e.target.value) || 1,
                                  },
                                },
                              })
                            }
                          />
                        </div>
                        <div>
                          <Label>Height</Label>
                          <Input
                            type="number"
                            value={selectedElement.style.size.height}
                            onChange={(e) =>
                              updateElement(selectedElement.id, {
                                style: {
                                  ...selectedElement.style,
                                  size: {
                                    ...selectedElement.style.size,
                                    height: parseInt(e.target.value) || 1,
                                  },
                                },
                              })
                            }
                          />
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </>
            )}

            <Separator />

            <div className="space-y-2">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={undo}
                  disabled={historyIndex <= 0}
                >
                  <Undo className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={redo}
                  disabled={historyIndex >= history.length - 1}
                >
                  <Redo className="w-4 h-4" />
                </Button>
              </div>

              <Button onClick={handleSave} className="w-full">
                <Save className="w-4 h-4 mr-2" />
                Save Template
              </Button>
            </div>
          </div>
        </ScrollArea>
      </div>

      <div className="flex-1 overflow-auto bg-gray-100">
        <div className="p-8 flex items-center justify-center min-h-full">
          <div
            ref={canvasRef}
            className="relative bg-white shadow-lg border"
            style={{
              width: `${templateData.dimensions.width * zoom}px`,
              height: `${templateData.dimensions.height * zoom}px`,
              transform: `scale(${zoom})`,
              transformOrigin: "top left",
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <CustomTemplateRenderer
              templateData={templateData}
              {...certificateData}
            />

            {templateData.elements.map((element) => (
              <div
                key={element.id}
                className={`absolute border-2 cursor-move ${
                  selectedElementId === element.id
                    ? "border-blue-500 bg-blue-100/20"
                    : element.binding
                    ? "border-green-300 hover:border-green-400"
                    : "border-transparent hover:border-gray-300"
                }`}
                style={{
                  left: element.style.position.x,
                  top: element.style.position.y,
                  width: element.style.size.width,
                  height: element.style.size.height,
                  zIndex: 1000 + (element.style.zIndex || 1),
                }}
                onMouseDown={(e) => handleElementMouseDown(e, element.id)}
              >
                {element.binding && (
                  <div className="absolute -top-6 left-0 text-xs bg-green-100 text-green-800 px-2 py-1 rounded pointer-events-none">
                    {element.binding}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
