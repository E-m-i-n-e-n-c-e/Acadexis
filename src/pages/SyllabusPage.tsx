import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BookOpen, Brain, ChevronRight, Sparkles } from 'lucide-react';
import { getSyllabusDocuments, getMindMaps, type MindMapNode } from '@/lib/store';

const SyllabusPage: React.FC = () => {
  const syllabi = getSyllabusDocuments();
  const mindMaps = getMindMaps();
  const [selectedSubject, setSelectedSubject] = useState<string | null>(syllabi[0]?.id || null);
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);

  const currentMindMap = selectedSubject ? mindMaps[selectedSubject] : null;

  const renderNode = (node: MindMapNode, depth = 0) => (
    <div key={node.id} className="ml-4">
      <button
        onClick={() => setSelectedNode(node)}
        className={`flex items-center gap-2 p-2 rounded-lg w-full text-left transition-colors hover:bg-muted ${selectedNode?.id === node.id ? 'bg-primary/10 text-primary' : ''}`}
      >
        <div className={`w-3 h-3 rounded-full ${node.importance === 'high' ? 'bg-destructive' : node.importance === 'medium' ? 'bg-warning' : 'bg-success'}`} />
        <span className="font-medium">{node.label}</span>
        {node.children.length > 0 && <ChevronRight className="h-4 w-4 ml-auto" />}
      </button>
      {node.children.length > 0 && <div className="border-l-2 border-border ml-3">{node.children.map(child => renderNode(child, depth + 1))}</div>}
    </div>
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2"><Brain className="h-6 w-6 text-primary" />Syllabus & AI Mind Maps</h1>
          <p className="text-muted-foreground">Visual learning powered by AI analysis</p>
        </div>
        <Badge variant="gradient"><Sparkles className="h-3 w-3 mr-1" />AI Powered</Badge>
      </div>

      <div className="flex gap-2 flex-wrap">
        {syllabi.map(s => (
          <Button key={s.id} variant={selectedSubject === s.id ? 'default' : 'outline'} onClick={() => { setSelectedSubject(s.id); setSelectedNode(null); }}>
            <BookOpen className="h-4 w-4 mr-2" />{s.subject}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Topic Mind Map</CardTitle><CardDescription>Click topics to explore</CardDescription></CardHeader>
          <CardContent className="max-h-[500px] overflow-auto">
            {currentMindMap ? renderNode(currentMindMap) : <p className="text-muted-foreground">Select a subject</p>}
          </CardContent>
        </Card>

        <Card variant="gradient">
          <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-accent" />AI Explanation</CardTitle></CardHeader>
          <CardContent>
            {selectedNode ? (
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">{selectedNode.label}</h3>
                <Badge variant={selectedNode.importance === 'high' ? 'destructive' : selectedNode.importance === 'medium' ? 'warning' : 'success'}>{selectedNode.importance} importance</Badge>
                <p className="text-muted-foreground leading-relaxed">{selectedNode.explanation || 'Click on a topic to see AI-generated explanation.'}</p>
              </div>
            ) : <p className="text-muted-foreground">Select a topic from the mind map to see AI-generated insights</p>}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SyllabusPage;
