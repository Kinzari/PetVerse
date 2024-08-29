// "use client";
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import { cn } from "@/lib/utils"
// import { format } from "date-fns"
// import * as React from "react"
// import Link from "next/link"
// import {
//   Bell,
//   CircleUser,
//   Home,
//   LineChart,
//   Menu,
//   PawPrint,
//   Search,
//   Users,
//   Plus,
//   FileText,
//   Filter,
//   Archive,
//   Edit
// } from "lucide-react"

// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Calendar } from "@/components/ui/calendar"
// import { Calendar as CalendarIcon } from "lucide-react"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover"
// import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// export function Dashboard() {
//   // Sample data for the pets table
//   const pets = [
//     { ownerName: "Pitok", petName: "Batolata", species: "Dog", breed: "Labrador", dateOfBirth: "2020-05-15" },
//     { ownerName: "Kulas", petName: "DeMalas", species: "Cat", breed: "Siamese", dateOfBirth: "2019-11-22" },
//     { ownerName: "Sabel", petName: "Boss", species: "Dog", breed: "Golden Retriever", dateOfBirth: "2021-03-10" },
//   ]
//   const [date, setDate] = React.useState<Date>()
//   const [editingPet, setEditingPet] = React.useState(null)
//   const router = useRouter();

//   return (
//     <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
//       <div className="hidden border-r bg-muted/40 md:block">
//         <div className="flex h-full max-h-screen flex-col gap-2">
//           <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
//             <Link href="/petverse" className="flex items-center gap-2 font-semibold">
//               <PawPrint className="h-6 w-6" />
//               <span className="">PetVerse</span>
//             </Link>
//           </div>
//           <div className="flex-1">
//             <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
//               <Link
//                 href="#dashboard"
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
//               >
//                 <Home className="h-4 w-4" />
//                 Dashboard
//               </Link>
//               <Link
//                 href="#dataenty"
//                 className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
//               >
//                 <Plus className="h-4 w-4" />
//                 Data Entry
//               </Link>
//               <Link
//                 href="#archive"
//                 className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
//               >
//                 <Archive className="h-4 w-4" />
//                 Archive
//               </Link>
//             </nav>
//           </div>
//         </div>
//       </div>
//       <div className="flex flex-col">
//         <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
//           <Sheet>
//             <SheetTrigger asChild>
//               <Button
//                 variant="outline"
//                 size="icon"
//                 className="shrink-0 md:hidden"
//               >
//                 <Menu className="h-5 w-5" />
//                 <span className="sr-only">Toggle navigation menu</span>
//               </Button>
//             </SheetTrigger>
//             <SheetContent side="left" className="flex flex-col bg-white">
//               <nav className="grid gap-2 text-lg font-medium">
//                 <Link
//                   href="#petverse"
//                   className="flex items-center gap-2 text-lg font-semibold"
//                 >
//                   <PawPrint className="h-6 w-6" />
//                   <span className="">PetVerse</span>
//                 </Link>
//                 <Link
//                   href="#dashboard"
//                   className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
//                 >
//                   <Home className="h-5 w-5" />
//                   Dashboard
//                 </Link>
//                 <Link
//                   href="#dataentry"
//                   className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
//                 >
//                   <Plus className="h-5 w-5" />
//                   Data Entry
//                 </Link>
//                 <Link
//                   href="#archive"
//                   className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
//                 >
//                   <Archive className="h-5 w-5" />
//                   Archive
//                 </Link>
//               </nav>
//             </SheetContent>
//           </Sheet>
//           <div className="w-full flex-1">
//           </div>
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="secondary" size="icon" className="rounded-full">
//                 <CircleUser className="h-5 w-5" />
//                 <span className="sr-only">Toggle user menu</span>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="bg-white">
//               <DropdownMenuLabel>My Account</DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={() => router.push('/signin')}>Logout</DropdownMenuItem>

//             </DropdownMenuContent>
//           </DropdownMenu>
//         </header>
//         <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
//           <div className="flex items-center justify-between">
//             <h1 className="text-lg font-semibold md:text-2xl">Pet Management</h1>
//             <div className="flex gap-2">
//               <Dialog>
//                 <DialogTrigger asChild>
//                   <Button>
//                     <Plus className="mr-2 h-4 w-4" />
//                     Add Pet
//                   </Button>
//                 </DialogTrigger>
//                 <DialogContent className="sm:max-w-[425px] bg-white">
//                   <DialogHeader>
//                     <DialogTitle>Add Pets</DialogTitle>
//                     <DialogDescription>
//                       Fill up the following details.
//                     </DialogDescription>
//                   </DialogHeader>
//                   <div className="grid gap-4 py-4">
//                     <div className="grid grid-cols-4 items-center gap-4">
//                       <Label htmlFor="name" className="text-right">
//                         Owner&apos;s Name
//                       </Label>
//                       <Input
//                         id="name"
//                         defaultValue=""
//                         className="col-span-3"
//                       />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                       <Label htmlFor="username" className="text-right">
//                         Pet&apos;s Name
//                       </Label>
//                       <Input
//                         id="username"
//                         defaultValue=""
//                         className="col-span-3"
//                       />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                       <Label htmlFor="edit-species" className="text-right">
//                         Species
//                       </Label>
//                       <Input
//                         id="edit-species"
//                         defaultValue={""}
//                         className="col-span-3"
//                       />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                       <Label htmlFor="edit-breed" className="text-right">
//                         Breed
//                       </Label>
//                       <Input
//                         id="edit-breed"
//                         defaultValue={""}
//                         className="col-span-3"
//                       />
//                     </div>
//                     <div className="grid grid-cols-4 items-center gap-4">
//                       <Label htmlFor="username" className="text-right">
//                         Date of Birth
//                       </Label>
//                       <Popover>
//                         <PopoverTrigger asChild>
//                           <Button
//                             variant={"outline"}
//                             className={cn(
//                               "w-[280px] justify-start text-left font-normal",
//                               !date && "text-muted-foreground"
//                             )}
//                           >
//                             <CalendarIcon className="mr-2 h-4 w-4" />
//                             {date ? format(date, "PPP") : <span>Pick a date</span>}
//                           </Button>
//                         </PopoverTrigger>
//                         <PopoverContent className="w-auto p-0 bg-white">
//                           <Calendar
//                             mode="single"
//                             selected={date}
//                             onSelect={setDate}
//                             initialFocus
//                           />
//                         </PopoverContent>
//                       </Popover>
//                     </div>
//                   </div>
//                   <DialogFooter>
//                     <Button type="submit">Save changes</Button>
//                   </DialogFooter>
//                 </DialogContent>
//               </Dialog>
//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="outline">
//                     <Filter className="mr-2 h-4 w-4" />
//                     Filter
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end" className="bg-white">
//                   <DropdownMenuItem>Display by All</DropdownMenuItem>
//                   <DropdownMenuItem>Display by Pet&apos;s Name</DropdownMenuItem>
//                   <DropdownMenuItem>Display by Species</DropdownMenuItem>
//                   <DropdownMenuItem>Display by Breed</DropdownMenuItem>
//                   <DropdownMenuItem>Display by Date of Birth</DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
//           <Card>
//             <CardHeader>
//               <CardTitle>Pet List</CardTitle>
//               <CardDescription>Manage and view all registered pets</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Owner&apos;s Name</TableHead>
//                     <TableHead>Pet Name</TableHead>
//                     <TableHead>Species</TableHead>
//                     <TableHead>Breed</TableHead>
//                     <TableHead>Date of Birth</TableHead>
//                     <TableHead>Actions</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {pets.map((pet, index) => (
//                     <TableRow key={index}>
//                       <TableCell>{pet.ownerName}</TableCell>
//                       <TableCell>{pet.petName}</TableCell>
//                       <TableCell>{pet.species}</TableCell>
//                       <TableCell>{pet.breed}</TableCell>
//                       <TableCell>{pet.dateOfBirth}</TableCell>
//                       <TableCell>
//                         <Dialog>
//                           <DialogTrigger asChild>
//                             <Button variant="outline" size="sm">
//                               <Edit className="h-4 w-4 mr-2" />
//                               Edit
//                             </Button>
//                           </DialogTrigger>
//                           <DialogContent className="sm:max-w-[425px] bg-white">
//                             <DialogHeader>
//                               <DialogTitle>Edit Pet</DialogTitle>
//                               <DialogDescription>
//                                 Make changes to pet details here. Click save when you're done.
//                               </DialogDescription>
//                             </DialogHeader>
//                             <div className="grid gap-4 py-4">
//                               <div className="grid grid-cols-4 items-center gap-4">
//                                 <Label htmlFor="edit-owner" className="text-right">
//                                   Owner&apos;s Name
//                                 </Label>
//                                 <Input
//                                   id="edit-owner"
//                                   defaultValue={pet.ownerName}
//                                   className="col-span-3"
//                                 />
//                               </div>
//                               <div className="grid grid-cols-4 items-center gap-4">
//                                 <Label htmlFor="edit-pet" className="text-right">
//                                   Pet&apos;s Name
//                                 </Label>
//                                 <Input
//                                   id="edit-pet"
//                                   defaultValue={pet.petName}
//                                   className="col-span-3"
//                                 />
//                               </div>
//                               <div className="grid grid-cols-4 items-center gap-4">
//                                 <Label htmlFor="edit-species" className="text-right">
//                                   Species
//                                 </Label>
//                                 <Input
//                                   id="edit-species"
//                                   defaultValue={pet.species}
//                                   className="col-span-3"
//                                 />
//                               </div>
//                               <div className="grid grid-cols-4 items-center gap-4">
//                                 <Label htmlFor="edit-breed" className="text-right">
//                                   Breed
//                                 </Label>
//                                 <Input
//                                   id="edit-breed"
//                                   defaultValue={pet.breed}
//                                   className="col-span-3"
//                                 />
//                               </div>
//                               <div className="grid grid-cols-4 items-center gap-4 font-twitter-chirp">
//                                 <Label htmlFor="edit-dob" className="text-right font-twitter-chirp">
//                                   Date of Birth
//                                 </Label>
//                                 <Input
//                                   id="edit-dob"
//                                   type="date"
//                                   defaultValue={pet.dateOfBirth}
//                                   className="col-span-3 font-twitter-chirp"
//                                 />
//                               </div>

//                             </div>
//                             <DialogFooter>
//                               <Button type="submit">Save changes</Button>
//                             </DialogFooter>
//                           </DialogContent>
//                         </Dialog>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </CardContent>
//           </Card>
//         </main>
//       </div>
//     </div>
//   )
// }

// export default Dashboard;

