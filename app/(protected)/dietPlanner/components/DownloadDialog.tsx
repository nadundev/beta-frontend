import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { DietPlan } from "@/types/diet";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { DietPlanPDF } from "./DietPlanPDF";

interface DownloadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dietPlan: DietPlan;
}

export function DownloadDialog({ open, onOpenChange, dietPlan }: DownloadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Download Diet Plan</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <PDFDownloadLink
            document={<DietPlanPDF dietPlan={dietPlan} />}
            fileName="diet-plan.pdf"
            className="w-full"
          >
            <Button className="w-full gap-2">
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
          </PDFDownloadLink>
        </div>
      </DialogContent>
    </Dialog>
  );
} 