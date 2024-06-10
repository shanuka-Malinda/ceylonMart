import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileSystemFileEntry, NgxFileDropEntry } from 'ngx-file-drop';
import { CloudinaryService } from 'src/app/services/cloudinary.service';
import { CustomizationService } from 'src/app/services/customization.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-customization',
  templateUrl: './customization.component.html',
  styleUrls: ['./customization.component.css']
})
export class CustomizationComponent implements AfterViewInit, OnInit {

  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  private ctx!: CanvasRenderingContext2D;
  public drawing = false;
  public isEraser = false; // Add a flag for eraser mode
  private eraserSize = 10; // Eraser size, you can adjust it
  private image: HTMLImageElement | null = null; // Hold the loaded image

  ngAfterViewInit() {
    const canvasEl = this.canvas.nativeElement;
    const context = canvasEl.getContext('2d');
    if (context) {
      this.ctx = context;
      this.fillCanvasWithWhite();
    } else {
      throw new Error('Failed to get 2D context');
    }
  }

  fillCanvasWithWhite() {
    this.ctx.fillStyle = '#FFFFFF'; // Set the background color to white
    this.ctx.fillRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height); // Fill the canvas with white
  }

  toggleEraser() {
    this.isEraser = !this.isEraser;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event: MouseEvent) {
    this.drawing = true;
    this.ctx.beginPath();
    this.ctx.moveTo(event.offsetX, event.offsetY);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.drawing) {
      if (this.isEraser) {
        this.ctx.strokeStyle = '#FFFFFF'; // Assuming white is the background color
        this.ctx.lineWidth = this.eraserSize;
      } else {
        this.ctx.strokeStyle = '#000000'; // Drawing color
        this.ctx.lineWidth = 2; // Drawing line width
      }
      this.ctx.lineTo(event.offsetX, event.offsetY);
      this.ctx.stroke();
    }
  }

  @HostListener('mouseup')
  onMouseUp() {
    this.drawing = false;
    this.ctx.closePath();
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.drawing = false;
    this.ctx.closePath();
  }

  loadImage(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        const img = new Image();
        img.onload = () => {
          this.image = img;
          this.drawImage();
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  drawImage() {
    if (this.image) {
      this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height); // Clear the canvas
      this.fillCanvasWithWhite(); // Fill with white background
      this.ctx.drawImage(this.image, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height); // Draw the image
    }
  }

  saveAsPng() {
    // Redraw the canvas with a white background and the image before saving
    this.redrawCanvasWithBackground(() => {
      const canvasEl = this.canvas.nativeElement;
      const image = canvasEl.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = 'canvas.png';
      link.click();
    });
  }

  async copyToClipboard() {
    // Redraw the canvas with a white background and the image before copying
    this.redrawCanvasWithBackground(() => {
      const canvasEl = this.canvas.nativeElement;
      canvasEl.toBlob(async (blob) => {
        if (blob) {
          const item = new ClipboardItem({ 'image/png': blob });
          await navigator.clipboard.write([item]);
          alert('Canvas copied to clipboard!');
        } else {
          alert('Failed to copy canvas to clipboard.');
        }
      });
    });
  }

  private redrawCanvasWithBackground(callback: () => void) {
    // Create a temporary canvas to redraw the content with a white background
    const tempCanvas = document.createElement('canvas');
    const tempCtx = tempCanvas.getContext('2d');
    if (tempCtx) {
      tempCanvas.width = this.canvas.nativeElement.width;
      tempCanvas.height = this.canvas.nativeElement.height;
      tempCtx.fillStyle = '#FFFFFF'; // Set background to white
      tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height); // Fill the temporary canvas with white
      if (this.image) {
        tempCtx.drawImage(this.image, 0, 0, tempCanvas.width, tempCanvas.height); // Draw the image on the temporary canvas
      }
      tempCtx.drawImage(this.canvas.nativeElement, 0, 0); // Draw the current canvas content onto the temporary canvas
      this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height); // Clear the original canvas
      this.ctx.drawImage(tempCanvas, 0, 0); // Draw the combined content back to the original canvas
      callback();
    }


  }


  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
    this.fillCanvasWithWhite();
    this.image = null; // Clear the loaded image as well
  }








  ////////---------------Request Form-----------------------------------------------
  productForm: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private cloudinaryService: CloudinaryService,
    private customizationService: CustomizationService
  ) {
    this.productForm = this.fb.group({
      itemId: ['', Validators.required],
      description: ['', Validators.required],
      scales: ['', Validators.required],
      image: [null, Validators.required]
    });
  }


  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.updateValueAndValidity();

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }



  public files: NgxFileDropEntry[] = [];
  public imageFile: File | null = null;
  public imagePreviewReg: string | ArrayBuffer | null = null;

  @HostListener('window:paste', ['$event'])
  handlePaste(event: ClipboardEvent) {
    if (event.clipboardData) {
      const items = event.clipboardData.items;
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const file = items[i].getAsFile();
          if (file) {
            this.imageFile = file;
            const reader = new FileReader();
            reader.onload = (e) => {
              this.imagePreview = reader.result;
            };
            reader.readAsDataURL(file);
          }
        }
      }
    }
  }

  public dropped(files: NgxFileDropEntry[]) {
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.imageFile = file;
          const reader = new FileReader();
          reader.onload = (e) => {
            this.imagePreview = reader.result;
          };
          reader.readAsDataURL(file);
        });
      }
    }
  }

  public fileOver(event: any) {
    console.log(event);
  }

  public fileLeave(event: any) {
    console.log(event);
  }
  userId: any;
  userName: any;
  conNo: any;
  email: any;
  imageUrl: any;
  date: any;

  isUploading: boolean = false;

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
    this.conNo = localStorage.getItem('tel');
    this.email = localStorage.getItem('email');
    this.userId = localStorage.getItem('userID');
    this.date = this.date.toISOString();
    console.log("###:::::::::::" + this.userName);
    this.getCustomizations(this.userName);

  }
  description: string = '';
  sendImg: any;
  onSubmit() {
    console.log("username:::::::::" + this.userName);
    this.sendImg = this.imagePreview;
    console.log("hai shanuka................");
    console.log("photo ballo...." + this.imageFile);
    console.log("image" + this.image);
    console.log("img preview" + this.sendImg);
    console.log("image prevew reg" + this.imagePreviewReg);
    console.log("pakaya");
    this.isUploading = true;

    if (this.userName == null) {
      Swal.fire("This function is Registered customer Only")
    }
    else{
    this.cloudinaryService.uploadImage(this.sendImg).subscribe(
      (response) => {
        this.imageUrl = response.secure_url;
        const product = {
          userId: this.userId,
          description: this.description,
          imageUrl: this.imageUrl,
          contactNo: this.conNo,
          email: this.email,
          date: this.date,
          customizationStatus: "REQUEST",
          commonStatus: "ACTIVE"
        };
        this.customizationService.addCustom(product).subscribe(
          (response) => {
            console.log("Successfully Request" + response);
            this.isUploading = false;
            Swal.fire("Request sending successfully..!");
          }, (error) => {
            this.isUploading = false;
            console.log("Unsuccessfully Request" + error);
            Swal.fire('Oops', "Customization request is unsuccessfully..!");
          }
        )

      }, (errors) => {
        console.log("Image uploading unsuccessfully" + errors);
        this.isUploading = false;
        Swal.fire('Oops..!', "Image uploading unsuccessfully");
      }
    )}
  }

  customizations: any[] = [];
  errorMessage: string = '';

  getCustomizations(userId: string): void {
    console.log('Hi.. pakaya');
    console.log("userId"+userId);
    console.log("username"+this.userName);
    this.customizationService.getCustomizationByUserId(userId).subscribe(
      (data) => {
        this.customizations = data.payload[0];
        console.log('hellow kamba');
        console.log(this.customizations);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  
  }

  

}