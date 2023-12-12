import { Component } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-side-nav-bar',
  templateUrl: './side-nav-bar.component.html',
  styleUrls: ['./side-nav-bar.component.scss']
})
export class SideNavBarComponent {
  // swaggerData: any[] =[] ;
  // // menuItems: any[] = [];

  // constructor(private swaggerService: ApiService) {}

  // ngOnInit(): void {
    
  // this.swaggerService.getSwaggerData().subscribe(data => {
  //   // console.log('--paths--',this.swaggerData.paths);
  //   this.swaggerData = [];
    
  //   // console.log('--data--',this.swaggerData);

  //   for (const path in data.paths) {
  //     if (data.paths.hasOwnProperty(path)) {
  //       const methods = data.paths[path];
  //       console.log('--methods--',methods);
  //       // Loop through HTTP methods (e.g., get, post, etc.)
  //       for (const method in methods) {
  //         if (methods.hasOwnProperty(method)) {
  //           this.swaggerData.push(methods[method]); // Push the method data to the array
  //         }
  //       }
  //     }
  //   }
  // });
  swaggerData: any = [];
menuItems: any[] = [];
toggle = [];

constructor(private swaggerService: ApiService) {}

ngOnInit(): void {
  this.swaggerService.getSwaggerData().subscribe(data => {
    this.swaggerData = data;

    const processedData:any[]= [];

    for (const path in data.paths) {
      if (data.paths.hasOwnProperty(path)) {
        const methods = data.paths[path];

        for (const method in methods) {
          if (methods.hasOwnProperty(method)) {
            const operation = methods[method];

            // Assuming 'tags' property contains the desired information
            const tags = operation.tags;

            // Process tags and add to processedData
            tags.forEach((tag: any) => {
              const existingTag = processedData.find(item => item.name === tag);
              if (existingTag) {
                existingTag.children.push({
                  path: path,
                  operationId: operation.operationId
                });
              } else {
                processedData.push({
                  name: tag,
                  children: [{
                    path: path,
                    operationId: operation.operationId
                  }]
                });
              }
            });
          }
        }
      }
    }

    this.swaggerData = processedData;
  });
}

  
}

  // parseSwaggerData() {
  //   const paths = this.swaggerData.paths;

  //   for (const path in paths) {
  //     if (paths.hasOwnProperty(path)) {
  //       const tags = paths[path].post.tags; // Assuming you want to use tags from the POST method

  //       if (tags) {
  //         const sidebarItem = {
  //           path: path,
  //           tags: tags
  //         };
  //         this.sidebarItems.push(sidebarItem);
  //       }
  //     }
  //   }
  // }

